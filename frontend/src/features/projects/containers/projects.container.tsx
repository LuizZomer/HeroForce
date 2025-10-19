import { PaginationAdapter } from "@/shared/components/pagination";
import { useResponsiblesForSelect } from "@/shared/hooks/use-responsible-for-select.hook";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchProjects } from "../hooks/use-fetch-projects.hook";
import { ProjectsListFiltersPresenter } from "../presenters/projects-list-filters.presenter";
import { ProjectsListPresenter } from "../presenters/projects-list.presenter";
import { ProjectsRootPresenter } from "../presenters/projects-root.presenter";
import { IFindAllProjectsFilters } from "../requests/project/find-all-projects.request";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectStatusEnum } from "@/shared/types/project-status.enum";
import { ProjectHeaderPresenter } from "../presenters/project-header.presenter";
import { CreateProjectDialog } from "../components/dialog/create-project.dialog";
import { useAuth } from "@/shared/hooks/use-auth.hook";
import { Button } from "@/shared/components/ui/button";

export const ProjectsContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IFindAllProjectsFilters>({
    responsibleId: undefined,
    status: undefined,
  });

  const queryParams = useMemo(
    () => ({
      page,
      responsibleId: filters.responsibleId,
      status: filters.status,
    }),
    [page, filters]
  );

  const { data, isPending, refetch } = useFetchProjects(queryParams);

  const { data: responsiblesForSelect } = useResponsiblesForSelect();

  const handleFilterChange = (
    filter: "status" | "responsibleId",
    value: string | undefined
  ) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handleFilterSubmit = useCallback(() => {
    navigate({
      search: `?page=${page}&responsibleId=${
        filters.responsibleId || ""
      }&status=${filters.status || ""}`,
    });
  }, [filters, page]);

  useEffect(() => {
    if (page !== 1) {
      refetch();
    }
  }, [page, refetch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const responsibleId = queryParams.get("responsibleId");
    const status = queryParams.get("status");

    const newFilters = {
      responsibleId: responsibleId ? Number(responsibleId) : undefined,
      status: status as ProjectStatusEnum,
    };

    setFilters(newFilters);

    refetch();
  }, [location.search]);

  return (
    <ProjectsRootPresenter
      isLoading={isPending}
      dataLength={data?.projects.length || 0}
      header={
        <ProjectHeaderPresenter>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <div className="mb-4">
                <h1 className="text-4xl font-bold mb-2">
                  Gerenciamento de Projetos
                </h1>
                <p className="text-muted-foreground">
                  Visualize e gerencie todos os seus projetos em um só lugar
                </p>
              </div>
              <div>
                <Button variant="destructive" onClick={signOut}>
                  Logout
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ProjectsListFiltersPresenter
                filters={filters}
                responsibles={responsiblesForSelect || []}
                onFilterChange={handleFilterChange}
                onFilter={handleFilterSubmit}
              />
              <CreateProjectDialog
                responsiblesForSelect={responsiblesForSelect || []}
              />
            </div>
          </div>
        </ProjectHeaderPresenter>
      }
    >
      <>
        <div className="min-h-[calc(100vh-20rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectsListPresenter projects={data?.projects || []} />
          </div>
        </div>
        <PaginationAdapter
          page={page}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </>
    </ProjectsRootPresenter>
  );
};
