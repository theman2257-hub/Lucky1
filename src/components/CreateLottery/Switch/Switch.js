import React from "react";
import styles from "./styles.module.css";

const Switch = ({ isOn, handleToggle, colorOne, colorTwo }) => {
  console.log(colorOne, colorTwo)
  return (
    <div className={styles.wrapper}>
      <label className={styles.text}>{!isOn ? "Enable" : "Disable"}</label>
      <input
        checked={!isOn}
        onChange={handleToggle}
        className={styles.switchCheckbox}
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className={styles.switchLabel}
        htmlFor={`switch`}
      >
        <span className={styles.switchButton} />
      </label>
    </div>
  );
};

export default Switch;
