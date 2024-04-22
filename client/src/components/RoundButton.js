import React from "react";
import styles from "./RoundButton.module.css";

function RoundButton({ icon, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>{icons[icon]}</button>
  );
}
export function SmallButton({ icon, onClick }) {
  return (
    <button className={styles.smallButton} onClick={onClick}>{icons[icon]}</button>
  );
}

const icons = {
  'add': <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" fill="white" />
  </svg>,
  'play': <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12L8 5V19L20 12Z" fill="white" />
  </svg>
  ,
  'pause':
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
        fill="white"
      />
    </svg>,
  'delete': <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" fill="white" />
  </svg>
};

export default RoundButton;
