import { EmptyData } from "@/shared/components/empty-data";
import { Spinner } from "@/shared/components/ui/spinner";
import { FolderKanban } from "lucide-react";

interface ProjectsRootPresenterProps {
  children: React.ReactNode;
  isLoading: boolean;
  dataLength: number;
  header: React.ReactNode;
}

export const ProjectsRootPresenter = ({
  isLoading,
  dataLength,
  header,
  children,
}: ProjectsRootPresenterProps) => {
  return (
    <div className="flex flex-col gap-4 p-8">
      {header}
      {isLoading && <Spinner className="size-8" />}
      {!isLoading && dataLength === 0 && <EmptyData icon={FolderKanban} />}
      {!isLoading && dataLength > 0 && children}
    </div>
  );
};
