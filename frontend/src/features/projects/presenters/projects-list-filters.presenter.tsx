import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { IForSelectList } from "@/shared/types/for-select-list";
import { statusOptions } from "../constants/status-project.constant";
import { useState } from "react";

interface IProjectsListFiltersPresenterProps {
  responsibles: IForSelectList[];
  onFilter: (filter: { status?: string; responsibleId?: string }) => void;
  isAdmin: boolean;
  defaultValue: { status: string; responsibleId: string };
}

export const ProjectsListFiltersPresenter = ({
  responsibles,
  onFilter,
  isAdmin,
  defaultValue,
}: IProjectsListFiltersPresenterProps) => {
  const [status, setStatus] = useState(defaultValue.status || "");
  const [responsibleId, setResponsibleId] = useState(
    defaultValue.responsibleId || ""
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="w-full">
        <Select value={status} onValueChange={(val) => setStatus(val)}>
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

      {isAdmin && (
        <div className="w-full">
          <Select
            value={responsibleId}
            onValueChange={(val) => setResponsibleId(val)}
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
      )}

      <div className="w-full">
        <Button onClick={() => onFilter({ status, responsibleId })}>
          Buscar
        </Button>
      </div>
    </div>
  );
};
