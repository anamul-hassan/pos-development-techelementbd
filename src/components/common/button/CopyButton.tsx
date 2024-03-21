import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ICopyButtonProps {
  copyItem: string | number;
  className?: string;
}

const CopyButton: FC<ICopyButtonProps> = ({ copyItem, className }) => {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          onClick={handleCopy}
          className={cn(
            "border border-border/50 px-1.5 size-6 text-center inline-flex justify-center items-center text-foreground  font-anek text-[11px]  rounded-md hover:bg-accent duration-300 transition-all",
            className
          )}
        >
          {copied ? (
            <LuCheck className="size-4" />
          ) : (
            <LuCopy className="size-4" />
          )}
        </TooltipTrigger>
        <TooltipContent className="rounded-md h-7 font-anek font-normal leading-3">
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
