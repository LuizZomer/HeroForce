import loginBanner from "/register-banner.jpg";

interface LoginPresenterProps {
  children: React.ReactNode;
}

export const RegisterPresenter = ({ children }: LoginPresenterProps) => (
  <div className="flex w-full">
    <div className="w-[60%] flex justify-center">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <h3 className="text-4xl font-bold">Hero Force</h3>
          {children}
        </div>
      </div>
    </div>
    <div className="w-full">
      <img
        src={loginBanner}
        alt="Login Banner"
        className="object-cover w-full h-screen"
      />
    </div>
  </div>
);
