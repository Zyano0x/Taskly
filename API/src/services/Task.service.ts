import prisma from "../configs/database.config";
import { CreateTask, GetTasks, UpdateTask } from "../schemas/Task.schema";
import { Prisma } from "@prisma/client";

class TaskService {
  async createTask(data: CreateTask) {
    return prisma.task.create({ data });
  }

  async getTasks(data: GetTasks) {
    const { page, limit, status, search, sortBy, sortOrder } = data;
    const offset = (page - 1) * limit;

    // Construct dynamic where condition
    const condition: Prisma.TaskWhereInput = {
      ...(status === "completed" && { isCompleted: true }),
      ...(status === "incomplete" && { isCompleted: false }),
      ...(search && {
        OR: [{ title: { contains: search, mode: "insensitive" } }],
      }),
    };

    const [total, filtered, completed, tasks] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: condition }),
      prisma.task.count({
        where: { isCompleted: true },
      }),
      prisma.task.findMany({
        where: condition,
        skip: offset,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
    ]);

    return {
      tasks,
      completed,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(filtered / limit),
      },
    };
  }

  async getTaskById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  }

  async updateTasks(data: UpdateTask, condition?: Prisma.TaskWhereInput) {
    return prisma.task.updateMany({
      where: condition,
      data,
    });
  }

  async updateTask(id: string, data: UpdateTask) {
    return prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: string) {
    return prisma.task.delete({ where: { id } });
  }
}

export const taskService = new TaskService();
