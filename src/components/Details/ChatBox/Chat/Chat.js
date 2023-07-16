import styles from "./styles.module.css";

const Chat = ({ yourMsg, messages }) => {
  return (
    <div
      className={`${yourMsg ? styles.chatBlockSent : styles.chatBlockRecieved}`}
    >
      <div className={styles.chatImg}>
        {/* <img src={} alt="" /> */}
      </div>
      <div className={styles.chatMessages}>
        {messages.map((elem, idx) => {
          const classToBeGiven =
            idx === 0 && yourMsg
              ? styles.firstMessageSent
              : idx === 0 && !yourMsg
                ? styles.firstMessageReceived
                : yourMsg
                  ? styles.sentMsg
                  : styles.recievedMsg;
          return (
            <p className={classToBeGiven} key={elem + idx + new Date()}>
              {elem}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
