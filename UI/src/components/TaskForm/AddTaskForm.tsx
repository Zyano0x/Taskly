import React, { useState } from "react";

import styles from "./AddTaskForm.module.css";

import { useCreateTask } from "../../features/tasks/useCreateTask.ts";
import { ITask, Priority } from "../../services/Task.service.ts";

const AddTaskForm: React.FC = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const { createTask, isCreatingTask } = useCreateTask();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newTask: ITask = {
      title,
      priority: Priority.LOW,
    };

    createTask(newTask);
    setTitle("");
  }

  return (
    <section className={styles["section-task-form"]}>
      <form className={styles["add-task-form"]} onSubmit={handleSubmit}>
        <div className={styles["dots"]}>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                className={`${styles["dot"]} ${isFocus && styles["animation"]}`}
                key={i}
              >
                &nbsp;
              </div>
            ))}
        </div>
        <div className={styles["task-input-container"]}>
          <input
            type={"text"}
            name={"name"}
            value={title}
            className={styles["task-input"]}
            placeholder={`${isFocus ? "Enter your new task today" : "What's your next task?"} `}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e: React.ChangeEvent) =>
              setTitle((e.currentTarget as HTMLInputElement).value)
            }
            disabled={isCreatingTask}
          />
        </div>
      </form>
    </section>
  );
};

export default AddTaskForm;
