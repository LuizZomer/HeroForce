import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Calendar, Target, User } from "lucide-react";
import {
  statusColors,
  statusLabels,
} from "../../constants/status-project.constant";
import { IProject } from "@/shared/types/projects.type";
import { Badge } from "@/shared/components/ui/badge";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { CreateProjectGoalDialog } from "../dialog/create-project-goal.dialog";
import { EditProjectDialog } from "../dialog/edit-project.dialog";
import { EditProjectGoalDialog } from "../dialog/edit-project-goal.dialog";
import { ValidateRole } from "@/shared/services/secure/ValidateRole";

export const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <Card key={project.id} className="flex flex-col h-[18rem]">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          <Badge className={statusColors[project.status]} variant="secondary">
            {statusLabels[project.status]}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        <ValidateRole>
          <EditProjectDialog
            project={{
              ...project,
              id: project.id,
              responsibleId: String(project.user.id),
            }}
          />
        </ValidateRole>
      </CardHeader>
      <CardContent className="">
        <ScrollArea className="h-[7rem] flex flex-col gap-2">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{project.user.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(project.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4" />
                  <span>Metas ({project.goals.length})</span>
                </div>
                <ValidateRole>
                  <CreateProjectGoalDialog projectId={project.id} />
                </ValidateRole>
              </div>
              {project.goals.length > 0 && (
                <div className="">
                  <div className="flex flex-col gap-2 pb-2">
                    {project.goals.map((goal) => (
                      <div
                        key={goal.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground capitalize">
                            {goal.type}
                          </span>
                          <ValidateRole>
                            <EditProjectGoalDialog projectGoal={{ ...goal }} />
                          </ValidateRole>
                        </div>
                        <Badge
                          variant={goal.achieved ? "default" : "outline"}
                          className="text-xs"
                        >
                          {goal.achieved ? "Atingida" : "Em andamento"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
