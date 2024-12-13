import axios from "axios";

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface ITask {
  id?: string;
  title?: string;
  isCompleted?: boolean;
  priority?: Priority;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskCondition {
  taskName?: string;
  isCompleted?: boolean;
  priority?: Priority;
}

class TaskService {
  private API_URL = import.meta.env.VITE_API_URL;

  getTasks = async ({
    page,
    limit,
    status,
    search,
  }: {
    page: number;
    limit: number;
    status?: string | null;
    search?: string | null;
  }) => {
    try {
      const { data } = await axios.get<ITask[]>(this.API_URL, {
        params: {
          page,
          limit,
          status,
          search,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Tasks could not be loaded");
    }
  };

  getTask = async (id: string) => {
    try {
      const { data } = await axios.get<ITask>(`${this.API_URL}/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Task could not be loaded");
    }
  };

  createTask = async (taskData: Omit<ITask, "id">) => {
    try {
      const { data } = await axios.post<ITask>(this.API_URL, taskData);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Task could not be created");
    }
  };

  updateTasks = async (
    taskData: Partial<ITask>,
    condition?: ITaskCondition,
  ) => {
    try {
      const { data } = await axios.put<ITask>(this.API_URL, {
        data: taskData,
        condition,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Tasks could not be updated");
    }
  };

  updateTask = async (id: string, taskData: Partial<ITask>) => {
    try {
      const { data } = await axios.put<ITask>(
        `${this.API_URL}/${id}`,
        taskData,
      );
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Task could not be updated");
    }
  };

  deleteTask = async (id: string) => {
    try {
      await axios.delete<ITask>(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error("Task could not be deleted");
    }
  };
}

export const taskService = new TaskService();
