import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ITask,
  ITaskCondition,
  taskService,
} from "../../services/Task.service.ts";

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();
  const { mutate: updateTasks, isPending: isUpdatingTasks } = useMutation({
    mutationFn: ({
      taskData,
      condition,
    }: {
      taskData: ITask;
      condition?: ITaskCondition;
    }) => taskService.updateTasks(taskData, condition),
    onSuccess: () => {
      toast.success("All tasks updated successfully");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to update tasks");
    },
  });

  return { updateTasks, isUpdatingTasks };
};
