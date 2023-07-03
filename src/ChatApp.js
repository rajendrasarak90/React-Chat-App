import React, { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";

// users array
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
// backgound colors for users icon
const color_list = ["blue", "red", "green", "yellow", "pink"];

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const messageThreadRef = useRef(null);

  // keeping the scroll bar at bottom for every new message
  useEffect(() => {
    if (messageThreadRef.current) {
      messageThreadRef.current.scrollTop =
        messageThreadRef.current.scrollHeight;
    }
  }, [messages]);

  // function for tracing input text from user
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.endsWith("@")) {
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  // handling send message if user presses enter key
  const handleSendMessageByKey = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const randomIndex = Math.floor(Math.random() * user_list.length);
      const randomUser = user_list[randomIndex];
      const randomColor = color_list[randomIndex];
      const newMessage = {
        user: randomUser,
        color: randomColor,
        message: inputValue,
        likes: 0,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setShowMentions(false);
    }
  };

  // handling send message as user clicks button
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const randomIndex = Math.floor(Math.random() * user_list.length);
      const randomUser = user_list[randomIndex];
      const randomColor = color_list[randomIndex];
      const newMessage = {
        user: randomUser,
        color: randomColor,
        message: inputValue,
        likes: 0,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setShowMentions(false);
    }
  };

  // function for taging users using '@' symbol
  const handleMentionClick = (username) => {
    setInputValue(inputValue.replace(/@\S*$/, `@${username} `));
    setShowMentions(false);
  };

  const handleEmojiClick = (emojiObj) => {
    setInputValue((prevInput) => prevInput + emojiObj.emoji);
    setShowPicker(false);
  };

  // it is use to increase like count as clicked.
  const handleLike = (index) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, i) => {
        if (i === index) {
          return { ...message, likes: message.likes + 1 };
        }
        return message;
      })
    );
  };

  return (
    <div className="container">
      <div className="header">
        <div className="group-name">
          <h4>Group Chat</h4>
          <p>This channel is For Company Wide Chatter </p>
        </div>
        <div className="group-icon">
          <span>3 | 5</span>
          <i class="fa-solid fa-user-group"></i>
        </div>
      </div>
      <div className="message-thread" ref={messageThreadRef}>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="name-box">
              <span className={`center userIcon ${message.color}`}>
                {message.user[0]}
              </span>
              <span className="username">{message.user}</span>
              <span className="timeStamp">{message.timestamp}</span>
              <button className="like-button" onClick={() => handleLike(index)}>
                Like {message.likes > 0 ? message.likes : ""}
              </button>
            </div>
            <span className="description">{message.message}</span>
          </div>
        ))}
      </div>
      {showMentions && (
        <div className="mention-list">
          {user_list.map((user, index) => (
            <div
              key={index}
              className="mention"
              onClick={() => handleMentionClick(user)}
            >
              @{user}
            </div>
          ))}
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          onKeyDown={handleSendMessageByKey}
        />
        <button onClick={handleSendMessage}>Send</button>
        <i
          className="fa-regular fa-face-smile picker-icon"
          onClick={() => setShowPicker((val) => !val)}
        ></i>
      </div>
      {showPicker && <Picker onEmojiClick={handleEmojiClick} />}
    </div>
  );
};

export default ChatApp;
