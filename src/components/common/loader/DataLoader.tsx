import { FC } from "react";

interface IDataLoaderProps {}

const DataLoader: FC<IDataLoaderProps> = () => {
  return (
    <div className="duration-500 transition-opacity w-full h-screen  flex items-center justify-center absolute z-[99999999] left-0 top-0 backdrop-blur-[1px] delay-150 ease-linear flex-col bg-transparent">
      <span className="w-6 h-6 md:w-12 md:h-12 rounded-full animate-spin border-[4px] border-dotted border-tertiary/80 border-t-transparent  relative border-tertiary-background">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-10 md:h-10 rounded-full border-[3px] border-solid border-tertiary/30 border-t-transparent border-tertiary-background"></span>
      </span>
    </div>
  );
};
export default DataLoader;
