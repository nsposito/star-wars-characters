import React from "react";
import "./AlertModal.css";

const AlertModal = ({ setOpenAlert, title, message, firstButton, secondButton, customButtonAction }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{message}</p>
        </div>
        <div className="footer">
          <button className="firstButton"
            onClick={() => {
                setOpenAlert(false);
            }}
          >
            {firstButton}
          </button>
          <button className="secondButton" onClick={() => {
                customButtonAction()
            }}>{secondButton}</button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;