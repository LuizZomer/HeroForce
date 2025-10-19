import { useFetchProjects } from "../hooks/use-fetch-projects.hook";
import { ProjectsListPresenter } from "../presenters/projects-list.presenter";
import { ProjectsRootPresenter } from "../presenters/projects-root.presenter";
import { PaginationAdapter } from "@/shared/components/pagination";
import { useEffect, useState } from "react";

export const ProjectsContainer = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, refetch } = useFetchProjects({ page });

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <ProjectsRootPresenter
      isLoading={isPending}
      dataLength={data?.projects.length || 0}
    >
      <ProjectsListPresenter projects={data?.projects || []} />
      <PaginationAdapter
        page={data?.pagination.page || 1}
        totalPages={data?.pagination.totalPages || 1}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </ProjectsRootPresenter>
  );
};
