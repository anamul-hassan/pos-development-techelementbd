import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface IHeadingParagraphProps {
  heading: string | ReactNode;
  paragraph: string | ReactNode;
  className?: string;
}

const HeadingParagraph: FC<IHeadingParagraphProps> = ({
  heading,
  paragraph,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex space-x-1 items-center border-[0.5px] border-tertiary/40 rounded-md overflow-hidden",
        className
      )}
    >
      {/* HEADING */}
      {heading && (
        <label className="font-[500] bg-tertiary/10 px-2 py-0.5">
          {heading || "Data not found"}
        </label>
      )}
      {/* PARAGRAPH */}
      {paragraph && <p>{paragraph || "Data not found"}</p>}
    </div>
  );
};

export default HeadingParagraph;
