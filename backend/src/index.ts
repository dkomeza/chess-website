import express from "express";
import http from "http";
import { Server } from "socket.io";
import { User } from "./model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connect from "./config/database.js";
import auth from "./middleware/auth.js";

connect();

const app = express();
app.use(express.json());

const server = http.createServer(app);
// const io = new Server(server, {
//   path: "/api",
// });

app.get("/api/", auth, (req, res) => {
  res.send("Hello World!");
})

app.get("/api/status", (req, res) => {
  res.send({ status: "ok" });
});

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      res.status(400).send("All input is required");
      return;
    }
    const takenEmail = await User.findOne({ email });
    if (takenEmail) {
      res.status(409).send("Email already in use");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const processedEmail = email.toLowerCase();

    const user = await User.create({
      name: name,
      email: processedEmail,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/deleteUser", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send("All input is required");
      return;
    }
    User.findOneAndDelete({ email }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted User : ", docs);
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// io.on("connection", (socket) => {
//   console.log(socket);
//   console.log("a user connected");
// });

server.listen(5000, () => {
  console.log("listening on *:5000");
});
