import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";
import Heading from "../typography/Heading";

interface IFormWrapperProps {
  size: "full" | "half";
  children: ReactNode;
  heading: string;
  subheading?: string;
  className?: string;
}

const FormWrapper: FC<IFormWrapperProps> = ({
  size,
  children,
  heading,
  subheading,
  className,
}) => {
  return (
    <section
      className={`${
        size === "half" && "w-10/12 md:max-w-[400px] mx-auto"
      } font-anek`}
    >
      <div className={`flex flex-col ${size === "half" && "items-center"}`}>
        <Heading
          variant="secondary"
          className={`relative ${
            subheading && size === "half" && "!w-36 !text-center"
          } ${!subheading && size === "full" && "!w-full !text-left"}`}
        >
          {heading}
          {subheading && (
            <span className="absolute bg-primary/5 text-xs font-light md:left-[85%] left-0 -bottom-1/2 md:bottom-1/2 text-center px-2 py-1 rounded-full w-full">
              {subheading}
            </span>
          )}
        </Heading>
      </div>
      <div className={cn("w-full", className)}>{children}</div>
    </section>
  );
};

export default FormWrapper;
