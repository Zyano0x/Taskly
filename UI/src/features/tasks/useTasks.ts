import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { ITask, taskService } from "../../services/Task.service";
import { PAGE_SIZE } from "../../utils/constants.ts";
import { useEffect } from "react";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : PAGE_SIZE;
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const { data, isLoading } = useQuery<ITask[], Error>({
    queryKey: ["tasks", page, limit, status, search],
    queryFn: () => taskService.getTasks({ page, limit, status, search }),
  });

  // @ts-ignore
  const pageCount = Math.ceil(data?.results?.pagination.total / PAGE_SIZE);

  useEffect(() => {
    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["tasks", page + 1, limit],
        queryFn: () => taskService.getTasks({ page: page + 1, limit }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["tasks", page - 1, limit],
        queryFn: () => taskService.getTasks({ page: page - 1, limit }),
      });
    }
  }, [limit, page, pageCount, queryClient]);

  return { data, isLoading };
};
