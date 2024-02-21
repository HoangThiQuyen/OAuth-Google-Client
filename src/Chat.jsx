import { useContext, useEffect, useState } from "react";
import socket from "./socket";
import ProfileContext from "./ProfileContext";

const Chat = () => {
  const profile = useContext(ProfileContext);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(profile);
  useEffect(() => {
    socket.auth = {
      _id: profile._id,
    };
    socket.connect();
    socket.on("receive private message", (arg) => {
      setMessages((message) => [...message, arg.content]);
    });
    return () => {
      socket.disconnect();
    };
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("private message", {
      content: value,
      to: "65b4e0f4513e0e1c8b34da1a", //user_id
    });
    setValue("");
  };
  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
