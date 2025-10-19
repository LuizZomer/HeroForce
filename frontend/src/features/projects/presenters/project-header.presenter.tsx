export const ProjectHeaderPresenter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center justify-between">{children}</div>;
};
