import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import Heading from "./typography/Heading";

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
    <div
      className={cn(
        "bg-accent/5 border rounded-xl my-8 duration-150 transition-all",
        className
      )}
    >
      <div className="border-b bg-tertiary/5">
        <Heading className="py-1 px-4" variant="secondary">
          {heading}
        </Heading>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default InfoWrapper;
