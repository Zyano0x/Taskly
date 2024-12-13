import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ITask, taskService } from "../../services/Task.service.ts";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending: isUpdatingTask } = useMutation({
    mutationFn: ({ id, taskData }: { id: string; taskData: Partial<ITask> }) =>
      taskService.updateTask(id, taskData),
    onSuccess: () => {
      toast.success("Task updated successfully");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to update task"),
  });

  return { updateTask, isUpdatingTask };
};
