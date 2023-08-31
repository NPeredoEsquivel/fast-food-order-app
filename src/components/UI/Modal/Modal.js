import React, { useContext } from "react";
import ReactDOM from "react-dom";
import ModalContext from "../../../store/modal-context";
import classes from "./Modal.module.scss";

const Backdrop = () => {
  const ctx = useContext(ModalContext);
  return (
    <div
      onClick={() => {
        ctx.toggleModalOff();
      }}
      className={classes["backdrop"]}
    ></div>
  );
};

const Overlay = ({ children }) => {
  return <div className={classes["modal"]}>{children}</div>;
};

export default function Modal({ children }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <Overlay children={children} />,
        document.getElementById("overlay")
      )}
    </>
  );
}
