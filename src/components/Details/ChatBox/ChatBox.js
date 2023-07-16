import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import EmojiPicker from "emoji-picker-react";
import Chat from "./Chat/Chat";
import { oponent, user, send, emoji } from "../../../images/images";
import axios from "axios";

const ChatBox = () => {

  const [dummyChat, setDummyChat] = useState([
  ]);
  let url = "https://api.lucky1.io/tickets/chat";

  const getChat = async () => {
    const { data } = await axios.get(url);
    setDummyChat(data);
  };

  useEffect(() => {
    getChat();

  }, []);

  const [emojiPickerToggle, setEmojiPickerToggle] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const chatWrapperRef = useRef(null);
  const sendMsg = (e) => {
    e.preventDefault();
    if (messageInput === "") return;
    let lastMsgSentByYou = true;
    const copyChat = [...dummyChat];
    let postChatURL = "//newchat";

    const postChat = async () => {
      const { data } = await axios.post(postChatURL, {
        yourMsg: true,
        messages: [messageInput],
      });
    };
    postChat();
    setDummyChat((prev) => {
      if (!lastMsgSentByYou) {
        return [
          ...prev,
          { yourMsg: true, messages: [messageInput] },
        ];
      } else {
        return copyChat;
      }
    });
    setMessageInput("");
  };
  useEffect(() => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  }, [dummyChat]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatComp}>
        <div className={styles.chatHeader}>
          <h2>Chat Room</h2>
          <div className={styles.statusBar}>
            <span>Live</span>
            <p>Total Online: 296 Users</p>
          </div>
        </div>
        <div ref={chatWrapperRef} className={styles.chatRoom}>
          {dummyChat.map((elem, idx) => {
            return <Chat {...elem} key={idx + new Date()} />;
          })}
        </div>
        <form onSubmit={sendMsg} className={styles.inputDiv}>
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onClick={() => setEmojiPickerToggle(false)}
            type="text"
            placeholder="Type Something ..."
          />
          <div className={styles.rightInput}>
            <div type="button" className={styles.emojiWrapper}>
              <button className={styles.emoji}>
                <img
                  onClick={() => setEmojiPickerToggle((prev) => !prev)}
                  src={emoji}
                  alt=""
                />
              </button>
              <div className={styles.emojiPicker}>
                {emojiPickerToggle && (
                  <EmojiPicker
                    theme="dark"
                    previewConfig={false}
                    width={300}
                    height={350}
                    onEmojiClick={(e) =>
                      setMessageInput((prev) => (prev += e.emoji))
                    }
                  />
                )}
              </div>
            </div>
            <button type="submit" className={styles.send}>
              <img src={send} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
