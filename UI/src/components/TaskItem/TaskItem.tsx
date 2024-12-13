import React from "react";
import { MdOutlineDelete, MdOutlineDone } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi2";

import styles from "./TaskItem.module.css";
import Modal from "../Modal/Modal.tsx";
import EditTaskForm from "../TaskForm/EditTaskForm.tsx";
import ConfirmDelete from "../Modal/ConfirmDelete.tsx";

import { ITask } from "../../services/Task.service.ts";
import { useUpdateTask } from "../../features/tasks/useUpdateTask.ts";
import { useDeleteTask } from "../../features/tasks/useDeleteTask.ts";
import { formatDateTime } from "../../utils/helpers.ts";

interface ITaskItem {
  task: ITask;
}

const TaskItem: React.FC<ITaskItem> = ({ task }) => {
  const { id, title, isCompleted, priority, updatedAt } = task;
  const { updateTask, isUpdatingTask } = useUpdateTask();
  const { deleteTask, isDeletingTask } = useDeleteTask();

  function handleClick() {
    // @ts-ignore
    updateTask({ id, taskData: { isCompleted: !isCompleted } });
  }

  return (
    <>
      <div className={styles["task-item-container"]}>
        <div className={styles["task-item-content"]}>
          <button
            className={`${styles["btn-check"]} ${isCompleted && styles["checked"]}`}
            onClick={handleClick}
            disabled={isUpdatingTask}
          >
            <MdOutlineDone color={"#ffffff"} />
          </button>
          <div className={styles["task-item-details"]}>
            <div className={`${styles["task-item-header"]}`}>
              <p
                className={`${styles["task-item-name"]} ${isCompleted && styles["completed"]}`}
              >
                {title}
              </p>
              {!isCompleted && (
                <span
                  className={`${styles["task-item-priority"]} ${
                    priority === "LOW"
                      ? styles["low"]
                      : priority === "MEDIUM"
                        ? styles["medium"]
                        : priority === "HIGH"
                          ? styles["high"]
                          : ""
                  }`}
                >
                  {priority}
                </span>
              )}
            </div>
            <p className={styles["task-item-time"]}>
              {formatDateTime(updatedAt!)}
            </p>
          </div>
        </div>
        <div className={styles["task-item-actions"]}>
          <Modal>
            <Modal.Open opens={"update-task"}>
              <button className={`${styles["btn"]} ${styles["btn-edit"]}`}>
                <HiOutlinePencil size={17} />
              </button>
            </Modal.Open>
            <Modal.Window name={"update-task"}>
              <EditTaskForm task={task} />
            </Modal.Window>

            <Modal.Open opens={"delete-task"}>
              <button className={`${styles["btn"]} ${styles["btn-delete"]}`}>
                <MdOutlineDelete size={17} />
              </button>
            </Modal.Open>
            <Modal.Window name={"delete-task"}>
              <ConfirmDelete
                resource={"task"}
                disabled={isDeletingTask}
                onConfirm={() => deleteTask(task.id!)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
