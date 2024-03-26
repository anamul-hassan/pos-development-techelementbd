import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface IParagraphProps {
  children: string | ReactNode;
  className?: string;
  muted?: boolean;
}

const Paragraph: FC<IParagraphProps> = ({ children, className, muted }) => {
  return (
    <p
      className={cn(
        "text-[16px] font-[400] text-foreground/90 leading-7 max-w-none truncate",
        muted && "",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Paragraph;
