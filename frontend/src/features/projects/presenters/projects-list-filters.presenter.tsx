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

interface IProjectsListFiltersPresenterProps {
  responsibles: IForSelectList[];
  onFilter: (filter: { status?: string; responsibleId?: string }) => void;
  value: { status: string; responsibleId: string };
}

export const ProjectsListFiltersPresenter = ({
  responsibles,
  onFilter,
  value,
}: IProjectsListFiltersPresenterProps) => (
  <div className="grid grid-cols-3 gap-2">
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
          <SelectTrigger>
            <SelectValue placeholder="Selecione um responsável" />
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
  </div>
);
