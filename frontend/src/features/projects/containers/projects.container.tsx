import { PaginationAdapter } from "@/shared/components/pagination";
import { Button } from "@/shared/components/ui/button";
import { useAuth } from "@/shared/hooks/use-auth.hook";
import { useResponsiblesForSelect } from "@/shared/hooks/use-responsible-for-select.hook";
import { useEffect } from "react";
import { CreateProjectDialog } from "../components/dialog/create-project.dialog";
import { useFetchProjects } from "../hooks/use-fetch-projects.hook";
import { ProjectHeaderPresenter } from "../presenters/project-header.presenter";
import { ProjectsListFiltersPresenter } from "../presenters/projects-list-filters.presenter";
import { ProjectsListPresenter } from "../presenters/projects-list.presenter";
import { ProjectsRootPresenter } from "../presenters/projects-root.presenter";
import { ValidateRole } from "@/shared/services/secure/ValidateRole";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectStatusEnum } from "@/shared/types/project-status.enum";

export const ProjectsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const location = useLocation();
  const { user } = useAuth();
  const { signOut } = useAuth();

  const page = Number(searchParams.get("page") || 1);
  const status = searchParams.get("status") || undefined;
  const responsibleId =
    user?.role === "ADMIN"
      ? searchParams.get("responsibleId") || undefined
      : user?.id;

  const { data, isPending, refetch } = useFetchProjects({
    page,
    status: status as ProjectStatusEnum,
    responsibleId: responsibleId ? Number(responsibleId) : undefined,
  });

  const { data: responsiblesForSelect } = useResponsiblesForSelect();

  const handleFilter = (filters: {
    status?: string;
    responsibleId?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (filters.status) newParams.set("status", filters.status);
    else newParams.delete("status");

    if (filters.responsibleId)
      newParams.set("responsibleId", filters.responsibleId);
    else newParams.delete("responsibleId");

    newParams.set("page", "1");

    setSearchParams(newParams);
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
                isAdmin={user?.role === "ADMIN"}
                defaultValue={{
                  status: status || "",
                  responsibleId: responsibleId ? String(responsibleId) : "",
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
            handlePageChange(page);
          }}
        />
      </>
    </ProjectsRootPresenter>
  );
};
