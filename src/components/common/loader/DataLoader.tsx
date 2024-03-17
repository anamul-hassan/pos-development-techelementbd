import { FC } from "react";

interface IDataLoaderProps {}

const DataLoader: FC<IDataLoaderProps> = () => {
  return (
    <div className="duration-500 transition-opacity w-full h-screen bg-accent/20  flex items-center justify-center absolute z-[99999999] left-0 top-0 backdrop-blur-[1px] delay-150 ease-linear flex-col">
      <span className="w-6 h-6 md:w-12 md:h-12 rounded-full animate-spin border-[4px] border-dotted border-tertiary/80 border-t-transparent relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-10 md:h-10 rounded-full border-[3px] border-solid border-tertiary/30 border-t-transparent"></span>
      </span>

      {/* <p
        className={`font-medium text-foreground/40 mt-2`}
        // className={`font-medium text-foreground/40 mt-2`}
      >
        Data is loading...
      </p> */}
    </div>
  );
};

export default DataLoader;
