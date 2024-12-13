import React, {
  ReactNode,
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import styles from "./Modal.module.css";

interface IModalContext {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

// @ts-ignore
const ModalContext = createContext<IModalContext>();

interface IOpen {
  children: ReactNode;
  opens: string;
}

const Open: React.FC<IOpen> = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children as ReactElement, {
    onClick: () => open(opensWindowName),
  });
};

interface IWindow {
  children: ReactNode;
  name: string;
}

const Window: React.FC<IWindow> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);

  if (openName !== name) return null;

  return createPortal(
    <div className={styles["overlay"]}>
      <div className={styles["modal-container"]}>
        <button className={styles["btn-close"]} onClick={close}>
          <HiXMark />
        </button>
        <div>{cloneElement(children as ReactElement, { onClose: close })}</div>
      </div>
    </div>,
    document.querySelector("body")!,
  );
};

interface IModal {
  children: ReactNode;
}

interface IModalComposition {
  Open: React.FC<IOpen>;
  Window: React.FC<IWindow>;
}

const Modal: React.FC<IModal> & IModalComposition = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
