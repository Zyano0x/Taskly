import React from "react";

import styles from "./ConfirmDelete.module.css";

interface IConfirmDelete {
  resource: string;
  disabled: boolean;
  onConfirm: () => void;
  onClose?: () => void;
}

const ConfirmDelete: React.FC<IConfirmDelete> = ({
  resource,
  disabled,
  onConfirm,
  onClose,
}) => {
  return (
    <div className={styles["delete-container"]}>
      <h3>Delete {resource}</h3>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>
      <div>
        <button
          onClick={onClose}
          className={`${styles["btn"]} ${styles["btn-secondary"]}`}
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`${styles["btn"]} ${styles["btn-danger"]}`}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
