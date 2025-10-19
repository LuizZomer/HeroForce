import { ProjectStatusEnum } from "@/shared/types/project-status.enum";

export const statusOptions = [
  { value: "pending", label: "Pendente" },
  { value: "in_progress", label: "Em andamento" },
  { value: "completed", label: "Concluído" },
];

export const statusLabels: Record<ProjectStatusEnum, string> = {
  [ProjectStatusEnum.PENDING]: "Pendente",
  [ProjectStatusEnum.IN_PROGRESS]: "Em Progresso",
  [ProjectStatusEnum.COMPLETED]: "Concluído",
};

export const statusColors: Record<ProjectStatusEnum, string> = {
  [ProjectStatusEnum.PENDING]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  [ProjectStatusEnum.IN_PROGRESS]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  [ProjectStatusEnum.COMPLETED]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};
