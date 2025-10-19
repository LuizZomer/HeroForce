import { useNavigate } from "react-router-dom";
import loginBanner from "/login-banner.jpg";
import { Button } from "@/shared/components/ui/button";

interface LoginPresenterProps {
  children: React.ReactNode;
}

export const LoginPresenter = ({ children }: LoginPresenterProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center">
      <div className="w-full hidden lg:block">
        <img
          src={loginBanner}
          alt="Login Banner"
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="w-[60%] flex justify-center md:">
        <div className="h-screen w-full flex items-center justify-center">
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <h3 className="text-4xl font-bold">Hero Force</h3>
            {children}
            <Button variant="link" onClick={() => navigate("/register")}>
              Não tem conta?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
