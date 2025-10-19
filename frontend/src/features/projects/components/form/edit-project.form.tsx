import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { IForSelectList } from "@/shared/types/for-select-list";
import { statusOptions } from "../../constants/status-project.constant";
import {
  IProjectForm,
  useProjectForm,
} from "../../hooks/form/project-form.hook";

export const EditProjectForm = ({
  responsiblesForSelect,
  onSubmit,
  isSubmiting,
  defaultValues,
}: {
  responsiblesForSelect: IForSelectList[];
  onSubmit: (data: IProjectForm) => void;
  isSubmiting: boolean;
  defaultValues: IProjectForm;
}) => {
  const methods = useProjectForm({ ...defaultValues });

  console.log(methods.watch('id'));

  return (
    <Form {...methods}>
      <form id="edit-project-form" onSubmit={methods.handleSubmit(onSubmit)}>
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
        </fieldset>
      </form>
    </Form>
  );
};
