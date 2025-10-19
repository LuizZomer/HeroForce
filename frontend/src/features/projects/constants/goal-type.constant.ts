import { ProjectGoalTypeEnum } from "@/shared/types/project-goal-type.enum";

export const goalTypeOptions = [
  { value: "agility", label: "Agilidade" },
  { value: "enchantment", label: "Encantamento" },
  { value: "efficiency", label: "Eficiência" },
  { value: "excellence", label: "Excelência" },
  { value: "transparency", label: "Transparência" },
  { value: "ambition", label: "Ambição" },
];

export const goalTypeLabels: Record<ProjectGoalTypeEnum, string> = {
  [ProjectGoalTypeEnum.AGILITY]: "Agilidade",
  [ProjectGoalTypeEnum.ENCHANTMENT]: "Encantamento",
  [ProjectGoalTypeEnum.EFFICIENCY]: "Eficiência",
  [ProjectGoalTypeEnum.EXCELLENCE]: "Excelência",
  [ProjectGoalTypeEnum.TRANSPARENCY]: "Transparência",
  [ProjectGoalTypeEnum.AMBITION]: "Ambição",
};
