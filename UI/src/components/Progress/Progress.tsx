import React from "react";

import styles from "./Progress.module.css";

import { useTasks } from "../../features/tasks/useTasks.ts";

const Progress: React.FC = () => {
  const { data } = useTasks();

  // @ts-ignore
  const total = data?.results?.pagination.total || 0;
  // @ts-ignore
  const completed = data?.results?.completed || 0;

  return (
    <div className={styles["progress-container"]}>
      <div className={styles["progress-info"]}>
        <h3 className={styles["progress-title"]}>Day Progress</h3>
        <p className={styles["progress-goal"]}>
          {completed} / {total}
        </p>
      </div>
      <progress
        className={styles["progress-bar"]}
        value={completed}
        max={total}
      />
    </div>
  );
};

export default Progress;
