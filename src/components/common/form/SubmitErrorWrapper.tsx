import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { FC } from "react";
import ButtonLoader from "../loader/ButtonLoader";
import { cn } from "@/lib/utils";

interface ISubmitErrorWrapperProps {
  error: any;
  loading: boolean;
  className?: string;
  buttonLabel: string;
  errorTitle: string;
}

const SubmitErrorWrapper: FC<ISubmitErrorWrapperProps> = ({
  error,
  loading,
  className,
  buttonLabel,
  errorTitle,
}) => {
  return (
    <div
      className={cn("flex justify-between items-center my-2 w-full", className)}
    >
      <div className="flex justify-start w-full md:max-w-[300px]">
        {error && Object?.keys(error)?.length > 0 && "data" in error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{errorTitle}</AlertTitle>
            <AlertDescription>
              {error?.data?.message || "Something went wrong! try again"}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="flex justify-end w-1/2">
        <Button disabled={loading} type="submit">
          {loading && <ButtonLoader />}
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default SubmitErrorWrapper;
