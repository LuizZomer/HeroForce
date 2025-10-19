import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { IForSelectList } from "@/shared/types/for-select-list";
import { IFindAllProjectsFilters } from "../requests/project/find-all-projects.request";
import { statusOptions } from "../constants/status-project.constant";

interface IProjectsListFiltersPresenterProps {
  filters: IFindAllProjectsFilters;
  responsibles: IForSelectList[];
  onFilter: () => void;
  onFilterChange: (
    filter: "status" | "responsibleId",
    value: string | undefined
  ) => void;
}

export const ProjectsListFiltersPresenter = ({
  filters,
  responsibles,
  onFilter,
  onFilterChange,
}: IProjectsListFiltersPresenterProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="w-full">
        <Select
          onValueChange={(value) => onFilterChange("status", value)}
          value={filters.status != null ? filters.status : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Select
          onValueChange={(value) =>
            onFilterChange("responsibleId", value !== "" ? value : undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um responsável" />
          </SelectTrigger>
          <SelectContent>
            {responsibles.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Button onClick={onFilter}>Buscar</Button>
      </div>
    </div>
  );
};
