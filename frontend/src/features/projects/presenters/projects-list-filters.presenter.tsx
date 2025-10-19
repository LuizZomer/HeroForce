import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { IForSelectList } from "@/shared/types/for-select-list";
import { statusOptions } from "../constants/status-project.constant";
import { Label } from "@/shared/components/ui/label";
import { ValidateRole } from "@/shared/services/secure/ValidateRole";
import { Button } from "@/shared/components/ui/button";
import { FunnelX } from "lucide-react";

interface IProjectsListFiltersPresenterProps {
  responsibles: IForSelectList[];
  onFilter: (filter: { status?: string; responsibleId?: string }) => void;
  value: { status: string; responsibleId: string };
  clearFilters: () => void;
}

export const ProjectsListFiltersPresenter = ({
  responsibles,
  onFilter,
  value,
  clearFilters,
}: IProjectsListFiltersPresenterProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-end">
    <div className="w-full flex flex-col gap-2">
      <Label>Status</Label>
      <Select
        value={value.status}
        onValueChange={(val) => onFilter({ status: val })}
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

    <ValidateRole>
      <div className="w-full flex flex-col gap-2">
        <Label>Responsável</Label>
        <Select
          value={value.responsibleId}
          onValueChange={(val) => onFilter({ responsibleId: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Selecione um responsável"
              className="w-full"
            />
          </SelectTrigger>
          <SelectContent>
            {responsibles.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ValidateRole>

    <Button onClick={clearFilters} size="icon" variant="destructive">
      <FunnelX className="h-4 w-4" />
    </Button>
  </div>
);
