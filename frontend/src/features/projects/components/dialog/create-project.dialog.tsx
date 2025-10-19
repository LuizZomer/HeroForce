import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CreateProjectForm } from "../form/create-project.form";
import { IForSelectList } from "@/shared/types/for-select-list";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectRequest } from "../../requests/project/create-project.request";
import { useState } from "react";
import { toast } from "react-toastify";
import { IProjectForm } from "../../hooks/form/project-form.hook";

export const CreateProjectDialog = ({
  responsiblesForSelect,
}: {
  responsiblesForSelect: IForSelectList[];
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProjectRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success(data.message);

      setOpen(false);
    },
  });

  const onSubmit = (data: IProjectForm) => {
    mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Projeto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Projeto</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-20rem)]">
          <CreateProjectForm
            responsiblesForSelect={responsiblesForSelect}
            onSubmit={onSubmit}
            isSubmiting={isPending}
          />
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
