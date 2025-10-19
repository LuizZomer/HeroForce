import { ProjectGoalTypeEnum } from "@/shared/types/project-goal-type.enum";
import { formattedDateForInput } from "@/shared/utils/formatted-date-for-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const goalSchema = z.object({
  id: z.number().optional(),
  type: z.enum(ProjectGoalTypeEnum),
  targetValue: z.string().min(1, "Meta de valor deve ser selecionada"),
  currentValue: z.string().min(1, "Valor atual deve ser selecionado"),
  deadline: z.string().min(1, "Prazo deve ser selecionado"),
  achieved: z.boolean().optional(),
});

export type IProjectGoalForm = z.infer<typeof goalSchema>;

export const useProjectGoalForm = (defaultValues?: IProjectGoalForm) => {
  const methods = useForm<IProjectGoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      type: defaultValues?.type || ProjectGoalTypeEnum.AGILITY,
      targetValue: defaultValues?.targetValue || "0",
      currentValue: defaultValues?.currentValue || "0",
      deadline: defaultValues?.deadline
        ? formattedDateForInput(defaultValues?.deadline)
        : "",
      achieved: defaultValues?.achieved || false,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset({
        id: defaultValues.id,
        type: defaultValues.type,
        targetValue: String(defaultValues.targetValue),
        currentValue: String(defaultValues.currentValue),
        deadline: formattedDateForInput(defaultValues.deadline),
        achieved: defaultValues.achieved,
      });
    }
  }, [defaultValues?.id]);

  return methods;
};
