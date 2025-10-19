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
import { formatMoney } from "@/shared/utils/money-format";
import { goalTypeOptions } from "../../constants/goal-type.constant";
import {
  IProjectGoalForm,
  useProjectGoalForm,
} from "../../hooks/form/project-goal-form.hook";
import { Checkbox } from "@/shared/components/ui/checkbox";

export const EditProjectGoalForm = ({
  onSubmit,
  isSubmiting,
  defaultValues,
}: {
  onSubmit: (data: IProjectGoalForm) => void;
  isSubmiting: boolean;
  defaultValues: IProjectGoalForm;
}) => {
  const methods = useProjectGoalForm(defaultValues);
  return (
    <Form {...methods}>
      <form id="create-project-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmiting} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <FormField
              name="type"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormItem>Tipo</FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
              name="targetValue"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormItem>Meta de valor</FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = formatMoney(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="currentValue"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormItem>Valor atual</FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = formatMoney(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="deadline"
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

            <FormField
              name="achieved"
              control={methods.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormItem>Meta alcançada</FormItem>
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
