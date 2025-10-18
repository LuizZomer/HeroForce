import { EmptyData } from "@/shared/components/empty-data";
import { Spinner } from "@/shared/components/ui/spinner";
import { FolderKanban } from "lucide-react";

export const ProjectsRootPresenter = ({
  children,
  isLoading,
  dataLength,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  dataLength: number;
}) => {
  return (
    <div>
      <h1>Projects List</h1>
      {isLoading && <Spinner className="size-8" />}
      {!isLoading && dataLength === 0 && <EmptyData icon={FolderKanban} />}
      {!isLoading && dataLength > 0 && children}
    </div>
  );
};
