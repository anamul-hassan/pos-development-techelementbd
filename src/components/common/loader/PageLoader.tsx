import { FC } from "react";

interface IPageLoaderProps {}

const PageLoader: FC<IPageLoaderProps> = () => {
  return (
    <div className="duration-500 transition-opacity w-screen h-screen bg-accent/20  flex items-center justify-center absolute z-[99999999] left-0 top-0 backdrop-blur-sm delay-150 ease-linear">
      <span className="w-10 h-10 md:w-12 md:h-12 rounded-full animate-spin border-[3px] border-dotted border-foreground/50 border-t-transparent"></span>
    </div>
  );
};

export default PageLoader;
