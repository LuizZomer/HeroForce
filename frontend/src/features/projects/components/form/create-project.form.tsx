import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { statusOptions } from "../../constants/status-project.constant";
import { IForSelectList } from "@/shared/types/for-select-list";
import { useFieldArray } from "react-hook-form";
import { goalTypeOptions } from "../../constants/goal-type.constant";
import { Button } from "@/shared/components/ui/button";
import { GoalType } from "@/shared/types/goal-type";
import {
  IProjectForm,
  useProjectForm,
} from "../../hooks/form/project-form.hook";

export const CreateProjectForm = ({
  responsiblesForSelect,
  onSubmit,
  isSubmiting,
}: {
  responsiblesForSelect: IForSelectList[];
  onSubmit: (data: IProjectForm) => void;
  isSubmiting: boolean;
}) => {
  const methods = useProjectForm();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "goals",
  });

  return (
    <Form {...methods}>
      <form id="create-project-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmiting} className="flex flex-col gap-4">
          <FormField
            name="name"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormItem>Nome</FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormItem>Descrição</FormItem>
                <FormControl>
                  <Textarea {...field} className="resize-none max-h-20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormItem>Status</FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="responsibleId"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormItem>Responsável</FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsiblesForSelect.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Meta {index + 1}</h2>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="outline"
                >
                  Remover
                </Button>
              </div>
              <FormField
                name={`goals.${index}.type`}
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormItem>Tipo</FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {goalTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`goals.${index}.targetValue`}
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormItem>Meta de valor</FormItem>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`goals.${index}.currentValue`}
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormItem>Valor atual</FormItem>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`goals.${index}.deadline`}
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormItem>Prazo</FormItem>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              append({
                currentValue: "0",
                targetValue: "0",
                deadline: "",
                type: GoalType.AGILITY,
              })
            }
          >
            Adicionar meta
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
