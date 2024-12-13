import { Router } from "express";

import { taskController } from "../controllers/Task.controller";
import validate from "../middlewares/Validate.middleware";
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/Task.schema";

const router = Router();

router
  .route("/")
  .get(taskController.getTasks)
  .post(validate(CreateTaskSchema), taskController.createTask)
  .put(validate(UpdateTaskSchema), taskController.updateTasks);

router
  .route("/:id")
  .get(taskController.getTaskById)
  .delete(taskController.deleteTask)
  .put(validate(UpdateTaskSchema), taskController.updateTask);

export default router;
