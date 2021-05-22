import { useState } from "react";
import { io } from "socket.io-client";

export const socket = io(
  process.env.API_BASE_URL || "https://cricman.herokuapp.com/"
);

export function UseShocket() {
  const [messages, setMessage] = useState([] as any);

  socket.on("message", (data) => {
    // alert(123);
    console.log(data);
    setMessage(data.reverse());
  });

  return { messages, socket };
}
