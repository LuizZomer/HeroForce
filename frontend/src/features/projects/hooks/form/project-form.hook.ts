import { ProjectStatusEnum } from "@/shared/types/project-status.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { goalSchema } from "./project-goal-form.hook";
import { useEffect } from "react";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  responsibleId: z.string().min(1, "Responsável deve ser selecionado"),
  status: z.enum(ProjectStatusEnum),
  goals: z.array(goalSchema),
});

export type IProjectForm = z.infer<typeof schema>;

export const useProjectForm = (defaultValues?: Omit<IProjectForm, "goals">) => {
  const methods = useForm<IProjectForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      responsibleId: defaultValues?.responsibleId || "",
      status: defaultValues?.status || ProjectStatusEnum.PENDING,
      goals: [],
    },
  });

  useEffect(() => {
    if (defaultValues) {
      methods.reset({
        id: defaultValues.id,
        name: defaultValues.name,
        description: defaultValues.description,
        responsibleId: defaultValues.responsibleId,
        status: defaultValues.status,
        goals: [],
      });
    }
  }, [defaultValues?.id]);

  return methods;
};
