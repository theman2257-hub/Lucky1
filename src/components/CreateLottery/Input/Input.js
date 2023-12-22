import React from "react";
import Switch from "../Switch/Switch";
import styles from "./styles.module.css";

const Input = ({
  icon,
  label,
  labelExplainer,
  type,
  name,
  placeholder,
  onChange,
  value,
  switchs,
  disable,
  setDisable,
  options, // New prop for dropdown options
}) => {
  const selectedOptionIcon = options?.find(
    (option) => option.value === value
  )?.icon;

  const handleKeyDown = (event) => {
    if (
      type === "number" &&
      event.key !== "Backspace" &&
      !/[0-9]/.test(event.key)
    ) {
      event.preventDefault();
    }
  };

  // Function to render dropdown or input based on 'options' prop
  const renderInputOrDropdown = () => {
    if (options && options.length) {
      return (
        <select
          disabled={disable}
          id={name}
          name={name}
          value={value}
          className={`${styles.input} ${styles.text}`}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else {
      return (
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
          onKeyDown={handleKeyDown}
        />
      );
    }
  };

  return (
    <>
      <div className={`${styles.inputContainer}`}>
        <label
          htmlFor={name}
          className={`${styles.label} ${styles.text} ${
            switchs && styles.swithcWrapper
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
          className={` ${styles.inputAndIcon}  ${
            disable && styles.inputDisabled
          }`}
        >
          <img
            src={selectedOptionIcon || icon}
            alt="#"
            className={styles.icon}
          />
          {renderInputOrDropdown()}{" "}
          {/* Use the function to decide what to render */}
        </div>
        {labelExplainer && (
          <label
            htmlFor={name}
            className={`${styles.labelExplainer} ${styles.text} ${
              styles.secondary
            } ${switchs && styles.swithcWrapper}`}
          >
            {labelExplainer}{" "}
          </label>
        )}
      </div>
    </>
  );
};

export default Input;
