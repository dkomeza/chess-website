import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
}
