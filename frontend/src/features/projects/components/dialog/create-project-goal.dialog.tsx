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
import { PlusCircle } from "lucide-react";
import { createProjectGoalRequest } from "../../requests/project-goal/create-project-goal.request";
import { CreateProjectGoalForm } from "../form/create-project-goal.form copy";

export const CreateProjectGoalDialog = ({
  projectId,
}: {
  projectId: number;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProjectGoalRequest,
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
      id: projectId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="h-4 w-4" />
          Adicionar Meta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Meta</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-20rem)]">
          <CreateProjectGoalForm onSubmit={onSubmit} isSubmiting={isPending} />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button form="create-project-form" disabled={isPending}>
            {isPending ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
