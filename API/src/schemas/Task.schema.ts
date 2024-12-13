import { z } from "zod";

export const PriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const TaskSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, { message: "Title is required" }).max(255),
  isCompleted: z.boolean().default(false),
  priority: PriorityEnum.default("HIGH"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const GetTasksSchema = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive().default(1)),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1).max(100).default(5)),
  status: z.enum(["all", "completed", "incomplete"]).optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(["createdAt", "title", "priority"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTaskSchema = TaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type GetTasks = z.infer<typeof GetTasksSchema>;
