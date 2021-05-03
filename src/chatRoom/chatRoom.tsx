import { Avatar, Fab, TextField, Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import { UseShocket } from "Src/utils/shocket";
import SendIcon from "@material-ui/icons/Send";
import { useStateSelector } from "Src/reducers";

export const ChatRoom = () => {
  const { messages, socket } = UseShocket();

  const [text, setText] = useState("");
  const { data } = useStateSelector(({ authState }) => authState);

  return (
    <div className="chat-room">
      <div className="chat-messages">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.type == "vote" ? "vote" : ""}`}
          >
            <div className="chat-head">
              <Avatar
                className="avatar"
                src={`https://api.multiavatar.com/${message.user}.svg`}
              />
              <p>{message.user}</p>
            </div>
            <p
              className="message"
              dangerouslySetInnerHTML={{ __html: message.data }}
            ></p>
            <p className="chat-time">
              {new Date(message?.createdAt).toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        {/* <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          onChange={(e) => {
            setText(e.target.value);
          }}
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        /> */}
        <Editor
          apiKey="6nj2n0zpejpqtu0n9xvwjkkoyucpuf22r1f8xemr37sva5vj"
          init={{
            plugins: "emoticons",
            toolbar: "emoticons",
            toolbar_location: "bottom",
            menubar: false,
            statusbar: false,
            height: 200,
            width: "100%",
          }}
          value={text}
          onEditorChange={(e) => {
            setText(e);
          }}
          initialValue=""
        />
        <Fab
          color="secondary"
          className="send-button"
          aria-label="add"
          onClick={() => {
            socket.emit("chat", {
              data: text,
              user: data.userName,
              type: "message",
            });
            setText("");
          }}
        >
          <SendIcon />
        </Fab>
      </div>
    </div>
  );
};
