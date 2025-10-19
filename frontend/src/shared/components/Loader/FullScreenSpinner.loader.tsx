import { Spinner } from "../ui/spinner";

export const FullScreenSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="size-20" />
    </div>
  );
};
