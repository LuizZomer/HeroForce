import { IProject } from "@/shared/types/projects.type";

interface IProjectsListPresenterProps {
  projects: IProject[];
}

export const ProjectsListPresenter = ({
  projects,
}: IProjectsListPresenterProps) => {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
};
