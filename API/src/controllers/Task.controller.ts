import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import {
  CreateTaskSchema,
  GetTasksSchema,
  UpdateTaskSchema,
} from "../schemas/Task.schema";
import { taskService } from "../services/Task.service";
import { AppError, ErrorType } from "../utils/ErrorHandler.util";
import AsyncHandler from "../utils/AsyncHandler.util";

class TaskController {
  createTask = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const validatedData = CreateTaskSchema.parse(req.body);
      const task = await taskService.createTask(validatedData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        task,
      });
    },
  );

  getTasks = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const validatedParams = GetTasksSchema.parse(req.query);
      const results = await taskService.getTasks(validatedParams);

      res.status(StatusCodes.OK).json({
        status: "success",
        results,
      });
    },
  );

  getTaskById = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      if (!task) {
        return next(
          new AppError(
            "Task not found",
            StatusCodes.NOT_FOUND,
            ErrorType.NOT_FOUND,
          ),
        );
      }

      res.status(StatusCodes.OK).json({
        status: "success",
        task,
      });
    },
  );

  updateTasks = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { data, condition } = req.body;
      const validatedData = UpdateTaskSchema.parse(data);
      const updateTasks = await taskService.updateTasks(
        validatedData,
        condition,
      );

      if (!updateTasks) {
        return next(
          new AppError(
            "No Tasks to update ",
            StatusCodes.NOT_FOUND,
            ErrorType.NOT_FOUND,
          ),
        );
      }

      res.status(StatusCodes.OK).json({
        status: "success",
        results: updateTasks,
      });
    },
  );

  updateTask = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const validatedData = UpdateTaskSchema.parse(req.body);
      const updateTask = await taskService.updateTask(id, validatedData);

      if (!updateTask) {
        return next(
          new AppError(
            "No Task found with that ID",
            StatusCodes.NOT_FOUND,
            ErrorType.NOT_FOUND,
          ),
        );
      }

      res.status(StatusCodes.OK).json({
        status: "success",
        updateTask,
      });
    },
  );

  deleteTask = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      await taskService.deleteTask(id);

      res.status(StatusCodes.NO_CONTENT).json({ status: "success", data: {} });
    },
  );
}

export const taskController = new TaskController();
