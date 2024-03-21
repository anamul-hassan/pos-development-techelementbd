import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface IInfoWrapperProps {
  heading: string;
  children: ReactNode;
  className?: string;
}

const InfoWrapper: FC<IInfoWrapperProps> = ({
  heading,
  children,
  className,
}) => {
  return (
    <div className={cn("bg-accent/5 border rounded-xl my-8", className)}>
      <div className="border-b bg-tertiary/5">
        <h4 className="py-1 px-4 heading-secondary">{heading}</h4>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default InfoWrapper;
