import React from "react";

import styles from "./Header.module.css";
import Progress from "../Progress/Progress";
import { formatDateTime } from "../../utils/helpers.ts";

const Header: React.FC = () => {
  return (
    <header className={styles["header-container"]}>
      <div>
        <h1 className={styles["header-title"]}>Today's Task</h1>
        <p className={styles["header-description"]}>
          Manage your tasks and boost your productivity
        </p>
        <h2 className={styles["header-date"]}>{formatDateTime(new Date())}</h2>
      </div>
      <Progress />
    </header>
  );
};

export default Header;
