import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";

function App() {
  // const websocket = new WebSocket("wss://dev.dawidkomeza.pl/api/ping");
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://dev.dawidkomeza.pl/api/status")
      .then((res) => res.json())
      .then((data) => console.log(data));
    setSocket(io("https://dev.dawidkomeza.pl/", { path: "/api" }));
    setTimeout(() => {
      socket?.on("connect", () => {
        console.log("Connected");
        console.log(socket!.id);
      });
      socket?.on("message", (data) => {
        console.log(data);
      });
    });
  }, []);

  function changeCount() {
    // if (websocket.readyState === 1) {
    // websocket.send("Increment");
    // }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={changeCount}>count is {count}</button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
