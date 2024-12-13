import React from "react";
import { HashLoader } from "react-spinners";

import styles from "./TaskList.module.css";

import { ITask } from "../../services/Task.service.ts";
import { useTasks } from "../../features/tasks/useTasks.ts";

import TaskItem from "../TaskItem/TaskItem.tsx";
import Pagination from "../Pagination/Pagination.tsx";

const TaskList: React.FC = () => {
  const { data, isLoading } = useTasks();

  // @ts-ignore
  const tasks = data?.results?.tasks || [];
  // @ts-ignore
  const total = data?.results?.pagination.total || 0;
  // @ts-ignore
  const pages = data?.results?.pagination.pages || 1;

  if (isLoading) {
    return (
      <HashLoader
        color={"#555"}
        cssOverride={{
          margin: "0 auto",
        }}
      />
    );
  }

  return (
    <section className={styles["section-task"]}>
      <div className={styles["task-list-container"]}>
        {tasks.length > 0 ? (
          tasks.map((task: ITask) => <TaskItem task={task} key={task.id} />)
        ) : (
          <p className={styles["task-empty"]}>You currently have no tasks.</p>
        )}
      </div>
      <Pagination count={total} pages={pages} />
    </section>
  );
};

export default TaskList;
