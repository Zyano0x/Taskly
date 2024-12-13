import React from "react";
import styles from "./AppLayout.module.css";

import Header from "./components/Header/Header.tsx";
import Filter from "./components/Filter/Filter.tsx";
import AddTaskForm from "./components/TaskForm/AddTaskForm.tsx";
import TaskList from "./components/TaskList/TaskList.tsx";

const AppLayout: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <Header />
      <main>
        <Filter />
        <AddTaskForm />
        <TaskList />
      </main>
    </div>
  );
};

export default AppLayout;
