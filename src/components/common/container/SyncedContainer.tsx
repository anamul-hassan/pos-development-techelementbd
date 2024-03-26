import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface HeightSyncedContainerProps {
  children: ReactNode;
  referenceId: string;
  height?: boolean;
  width?: boolean;
  className?: string;
  trigger: any;
}

const SyncedContainer: React.FC<HeightSyncedContainerProps> = ({
  children,
  referenceId,
  height,
  width,
  className,
  trigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const reference = document.getElementById(referenceId);

    if (container && reference) {
      if (height) {
        const referenceHeight = reference.clientHeight;
        container.style.height = `${referenceHeight}px`;
      }
      if (width) {
        const referenceWidth = reference.clientWidth;

        container.style.width = `${referenceWidth}px`;
      }
    }
  }, [referenceId, height, width, trigger]);

  return (
    <div className={cn(``, className)} ref={containerRef}>
      {children}
    </div>
  );
};

export default SyncedContainer;
