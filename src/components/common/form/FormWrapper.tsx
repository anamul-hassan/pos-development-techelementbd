import { FC, ReactNode } from "react";

interface IFormWrapperProps {
  size: "full" | "half";
  children: ReactNode;
  heading: string;
  subheading?: string;
}

const FormWrapper: FC<IFormWrapperProps> = ({
  size,
  children,
  heading,
  subheading,
}) => {
  const locate = "en";
  return (
    <section
      className={`${size === "half" && "w-10/12 md:max-w-[400px] mx-auto"}`}
    >
      <div className={`flex flex-col ${size === "half" && "items-center"}`}>
        <h2
          className={`heading-secondary relative  ${
            locate === "en" ? "font-roboto" : "font-anek"
          } ${subheading && size === "half" && "!w-36 !text-center"} ${
            !subheading && size === "full" && "!w-full !text-left"
          }`}
        >
          {heading}
          {subheading && (
            <span className="absolute bg-primary/5 text-xs font-light md:left-[85%] left-0 -bottom-1/2 md:bottom-1/2 text-center px-2 py-1 rounded-full w-full">
              {subheading}
            </span>
          )}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  );
};

export default FormWrapper;