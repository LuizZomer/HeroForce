import { IProject } from "@/shared/types/projects.type";
import { ProjectCard } from "../components/card/project-card.card";

interface IProjectsListPresenterProps {
  projects: IProject[];
}

export const ProjectsListPresenter = ({
  projects,
}: IProjectsListPresenterProps) => {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
};
