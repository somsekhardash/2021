import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChatRoom } from "Src/chatRoom/chatRoom";
import { socket } from "Src/utils/shocket";
import { Header } from "./header";

export default function Notifications() {
  useEffect(() => {
    socket.emit("open-room");
  }, []);
  return (
    <div className="notifications">
      <Header />
      <ChatRoom />
      <div className="footer">
        <Button className="link" style={{ color: "white" }}>
          <Link to={`/`} className="btn btn-primary">
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
