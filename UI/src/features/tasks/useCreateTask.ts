import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskService } from "../../services/Task.service.ts";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending: isCreatingTask } = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      toast.success("Task created successfully");

      // queryClient.setQueryData(["tasks"], (tasks: Task[]) => {
      //   return [...(tasks || []), newTask];
      // });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to create task"),
  });

  return { createTask, isCreatingTask };
};
