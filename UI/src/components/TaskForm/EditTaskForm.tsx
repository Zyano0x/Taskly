import React from "react";
import { useForm } from "react-hook-form";

import styles from "./EditTaskForm.module.css";
import { ITask } from "../../services/Task.service.ts";
import { useUpdateTask } from "../../features/tasks/useUpdateTask.ts";

interface IEditTaskForm {
  task: ITask;
  onClose?: () => void;
}

const EditTaskForm: React.FC<IEditTaskForm> = ({ task, onClose }) => {
  const { id, ...values } = task;
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      taskName: values.title,
      priority: values.priority?.toLowerCase(),
      isCompleted: values.isCompleted === true ? "true" : "false",
    },
  });
  const { errors } = formState;
  const { updateTask, isUpdatingTask } = useUpdateTask();

  // @ts-ignore
  function onSubmit(data) {
    const editTask = {
      taskName: data.taskName,
      priority: data.priority?.toUpperCase(),
      isCompleted: data.isCompleted === "true",
    };

    updateTask(
      // @ts-ignore
      { id, taskData: editTask },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      },
    );
  }

  // @ts-ignore
  function onErrors(errors) {
    console.log(errors);
  }

  return (
    <form
      className={styles["edit-task-form"]}
      onSubmit={handleSubmit(onSubmit, onErrors)}
    >
      <div className={styles["form-container"]}>
        <div className={styles["form-group"]}>
          <label htmlFor={"name"} className={styles["form-label"]}>
            Task Name
          </label>
          <input
            type="text"
            id="name"
            className={styles["form-input"]}
            {...register("taskName", { required: "This field is required" })}
          />
          {errors?.taskName?.message && (
            <span className={styles["error-message"]}>
              {errors.taskName.message}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor={"priority"} className={styles["form-label"]}>
            Priority
          </label>
          <select
            id={"priority"}
            className={styles["form-select"]}
            {...register("priority", { required: "This field is required" })}
          >
            <option value={"low"}>LOW</option>
            <option value={"medium"}>MEDIUM</option>
            <option value={"high"}>HIGH</option>
          </select>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor={"status"} className={styles["form-label"]}>
            Status
          </label>
          <select
            id={"status"}
            className={styles["form-select"]}
            {...register("isCompleted", { required: "This field is required" })}
          >
            <option value={"true"}>COMPLETED</option>
            <option value={"false"}>INCOMPLETE</option>
          </select>
        </div>
      </div>
      <div className={styles["form-buttons"]}>
        <button
          type={"reset"}
          className={`${styles["btn"]} ${styles["btn-cancel"]}`}
          onClick={() => onClose?.()}
          disabled={isUpdatingTask}
        >
          Cancel
        </button>
        <button
          className={`${styles["btn"]} ${styles["btn-update"]}`}
          disabled={isUpdatingTask}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
