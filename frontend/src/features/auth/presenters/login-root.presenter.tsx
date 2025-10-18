interface LoginPresenterProps {
  children: React.ReactNode;
}

export const LoginPresenter = ({ children }: LoginPresenterProps) => {
  return (
    <div>
      <div></div>
      <div>{children}</div>
    </div>
  );
};
