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
import { IProjectForm } from "../../hooks/form/project-form.hook";
import { EditProjectForm } from "../form/edit-project.form";
import { useResponsiblesForSelect } from "@/shared/hooks/use-responsible-for-select.hook";
import { updateProjectRequest } from "../../requests/project/update-project.request";

export const EditProjectDialog = ({ project }: { project: IProjectForm }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: responsiblesForSelect } = useResponsiblesForSelect();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProjectRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      toast.success(data.message);

      setOpen(false);
    },
  });

  const onSubmit = (data: IProjectForm) => {
    console.log(data);

    mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Editar Projeto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Projeto</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh-20rem)]">
          <EditProjectForm
            responsiblesForSelect={responsiblesForSelect || []}
            onSubmit={onSubmit}
            isSubmiting={isPending}
            defaultValues={project}
          />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild disabled={isPending}>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button form="edit-project-form" disabled={isPending}>
            {isPending ? "Editando..." : "Editar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
