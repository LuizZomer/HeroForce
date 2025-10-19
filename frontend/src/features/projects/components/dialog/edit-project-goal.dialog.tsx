import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { IProjectGoalForm } from "../../hooks/form/project-goal-form.hook";
import { Pencil } from "lucide-react";
import { EditProjectGoalForm } from "../form/edit-project-goal.form";
import { editProjectGoalRequest } from "../../requests/project-goal/edit-project-goal.request";

export const EditProjectGoalDialog = ({
  projectGoal,
}: {
  projectGoal: IProjectGoalForm;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editProjectGoalRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success(data.message);

      setOpen(false);
    },
  });

  const onSubmit = (data: IProjectGoalForm) => {
    mutateAsync({
      ...data,
      id: projectGoal.id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Meta</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-20rem)]">
          <EditProjectGoalForm
            onSubmit={onSubmit}
            isSubmiting={isPending}
            defaultValues={projectGoal}
          />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button form="create-project-form" disabled={isPending}>
            {isPending ? "Editando..." : "Editar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
