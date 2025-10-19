import { PaginationAdapter } from "@/shared/components/pagination";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/hooks/use-auth.hook";
import { useResponsiblesForSelect } from "@/shared/hooks/use-responsible-for-select.hook";
import { useEffect, useState } from "react";
import { CreateProjectDialog } from "../components/dialog/create-project.dialog";
import { useFetchProjects } from "../hooks/use-fetch-projects.hook";
import { ProjectHeaderPresenter } from "../presenters/project-header.presenter";
import { ProjectsListFiltersPresenter } from "../presenters/projects-list-filters.presenter";
import { ProjectsListPresenter } from "../presenters/projects-list.presenter";
import { ProjectsRootPresenter } from "../presenters/projects-root.presenter";
import { ValidateRole } from "@/shared/services/secure/ValidateRole";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectStatusEnum } from "@/shared/types/project-status.enum";
import { IFindAllProjectsFilters } from "../requests/project/find-all-projects.request";

export const ProjectsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [filters, setFilters] = useState<IFindAllProjectsFilters>({
    status: (searchParams.get("status") as ProjectStatusEnum) || undefined,
    responsibleId: searchParams.get("responsibleId")
      ? Number(searchParams.get("responsibleId"))
      : undefined,
  });

  const page = Number(searchParams.get("page") || 1);

  const { data, isPending, refetch } = useFetchProjects({
    page,
    status: filters.status,
    responsibleId: filters.responsibleId,
  });

  const { data: responsiblesForSelect } = useResponsiblesForSelect();

  const handleFilter = (newFilter: {
    status?: string;
    responsibleId?: string;
  }) => {
    const updatedFilters = {
      ...filters,
      ...newFilter,
    };

    const newParams = new URLSearchParams(searchParams.toString());

    if (updatedFilters.status) newParams.set("status", updatedFilters.status);
    else newParams.delete("status");

    if (updatedFilters.responsibleId)
      newParams.set("responsibleId", String(updatedFilters.responsibleId));
    else newParams.delete("responsibleId");

    newParams.set("page", "1");

    console.log("updatedFilters", updatedFilters);

    setSearchParams(newParams);
    setFilters({
      status: updatedFilters.status as ProjectStatusEnum,
      responsibleId: updatedFilters.responsibleId
        ? Number(updatedFilters.responsibleId)
        : undefined,
    });
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const logout = () => {
    signOut();
    navigate("/auth");
  };

  useEffect(() => {
    if (page !== 1) {
      refetch();
    }
  }, [page, refetch]);

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
                <Button variant="destructive" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ProjectsListFiltersPresenter
                responsibles={responsiblesForSelect || []}
                onFilter={handleFilter}
                value={{
                  status: filters.status || "",
                  responsibleId: filters.responsibleId
                    ? String(filters.responsibleId)
                    : "",
                }}
              />
              <ValidateRole>
                <CreateProjectDialog
                  responsiblesForSelect={responsiblesForSelect || []}
                />
              </ValidateRole>
            </div>
          </div>
        </ProjectHeaderPresenter>
      }
    >
      <main>
        <section className="min-h-[calc(100vh-20rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectsListPresenter projects={data?.projects || []} />
          </div>
        </section>
        <PaginationAdapter
          page={page}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={(page) => {
            handlePageChange(page);
          }}
        />
      </main>
    </ProjectsRootPresenter>
  );
};
