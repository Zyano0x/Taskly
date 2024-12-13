import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../../services/Task.service.ts";
import toast from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending: isDeletingTask } = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to delete the task"),
  });

  return { deleteTask, isDeletingTask };
};
