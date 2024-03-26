import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

interface ICopyButtonProps {
  copyItem: string | number;
  className?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

const CopyButton: FC<ICopyButtonProps> = ({
  copyItem,
  className,
  tooltipSide = "top",
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyItem?.toString() || copyItem?.toString())
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error: any) => {
        toast({
          variant: "destructive",
          title: "Copy Error Message",
          description: `Failed to copy for this reason, ${error}`,
        });
      });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "border border-border/50 px-1.5 size-6 text-center inline-flex justify-center items-center text-foreground font-anek text-[11px]  rounded-md hover:bg-accent duration-300 transition-all group relative",
        className
      )}
    >
      {copied ? <LuCheck className="size-4" /> : <LuCopy className="size-4" />}
      {/* TOOLTIP TEXT */}
      <span className={`custom-tooltip-${tooltipSide}`}>Copy</span>
      <span className="sr-only">Copy Button</span>
    </button>
  );
};

export default CopyButton;
