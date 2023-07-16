import React from "react";
import Switch from "../Switch/Switch";
import styles from "./styles.module.css";

const Input = ({
  icon,
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  switchs,
  disable,
  setDisable,
}) => {
  const handleKeyDown = (event) => {
    if (event.key !== "Backspace" && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <div className={`${styles.inputContainer}`}>
        <label
          htmlFor={name}
          className={`${styles.label} ${styles.text} ${switchs && styles.swithcWrapper
            }`}
        >
          {label}{" "}
          {switchs && (
            <Switch
              isOn={disable}
              handleToggle={() => setDisable((prev) => !prev)}
              colorTwo="#633DFD"
              colorOne="#30303E"
            />
          )}
        </label>
        <div
          className={` ${styles.inputAndIcon}  ${disable && styles.inputDisabled
            }`}
        >
          <img src={icon} alt="#" className={styles.icon} />
          <input
            type={type}
            disabled={disable}
            id={name}
            name={name}
            value={value}
            className={`${styles.input} ${styles.text}`}
            placeholder={placeholder}
            onChange={onChange}
            min={type === "number" ? 1 : ""}
            onKeyDown={type === "number" && handleKeyDown}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
