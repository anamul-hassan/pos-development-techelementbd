import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface IInputWrapperProps {
  children: ReactNode;
  error: string | undefined;
  label: string;
  labelFor: string;
  className?: string;
}

const InputWrapper: FC<IInputWrapperProps> = ({
  children,
  error,
  label,
  labelFor,
  className,
}) => {
  return (
    <div className={cn("w-full flex flex-col", className)}>
      {label && (
        <label
          className="font-roboto text-sm max-w-none truncate inline-block leading-8"
          htmlFor={labelFor || ""}
        >
          {(label.trim() === "#" && (
            <span className="invisible leading-8">empty</span>
          )) ||
            label ||
            ""}
        </label>
      )}
      {children}
      {error && (
        <label
          className="font-roboto text-sm text-destructive max-w-none block mt-1"
          htmlFor={labelFor || ""}
        >
          {error || ""}
        </label>
      )}
    </div>
  );
};

export default InputWrapper;
