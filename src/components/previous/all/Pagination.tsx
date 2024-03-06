import { FC } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

interface Pagination {
  isLoading?: any;
  totalItems?: any;
  currPage: number;
  setCurrPage?: any;
  totalPage?: any;
  pageLength?: any;
}
const Pagination: FC<Pagination> = ({
  isLoading,
  totalItems,
  currPage,
  setCurrPage,
  totalPage,
}) => {
  // page number show
  const pageLimit = 2;
  const pageShow = Math.min(pageLimit, totalPage);
  const startPage = Math.max(1, currPage - Math.floor(pageShow / 2));

  // show data status on current page
  const pageLength = 10;
  const startIndex = (currPage - 1) * pageLength + 1;
  const endIndex = Math.min(currPage * pageLength, totalItems);

  // Previous
  const handleBack = () => {
    if (currPage === 1) return currPage;
    setCurrPage(currPage - 1);
  };
  // Next
  const handleGo = () => {
    if (currPage === totalPage) return currPage;
    setCurrPage(currPage + 1);
  };

  return (
    <div className="flex items-center gap-1">
      <div
        onClick={handleBack}
        className={`text-base text-black font-medium tracking-wide uppercase cursor-pointer rounded-lg bg-brand4 shadow-md shadow-brand4 drop-shadow-md duration-700 transition-all w-24 h-[42px] flex items-center justify-center gap-3 ${
          currPage !== 1 ? "active:scale-x-105" : ""
        }`}
      >
        <MdArrowLeft
          className={`text-lg text-white rounded-[50%] ${
            currPage === 1
              ? "bg-gradient-to-br from-rose-800 to-rose-400"
              : "bg-gradient-to-br from-indigo-800 to-indigo-400"
          }`}
        />
        Back
      </div>
      {Array.from({ length: pageShow }, (_, index) => startPage + index).map(
        (page) => (
          <div
            key={page}
            className={`text-base text-black font-medium tracking-wide uppercase cursor-default 
                         rounded-lg shadow-md shadow-brand4 drop-shadow-md w-10 h-[42px] flex
                         items-center justify-center duration-500 transition-colors 
                        ${
                          currPage === page
                            ? "bg-gradient-to-br from-indigo-400 to-indigo-800 text-white"
                            : "bg-brand4"
                        }`}
          >
            {page}
          </div>
        )
      )}
      <div className="text-base font-bold tracking-wide uppercase rounded-lg bg-brand4 shadow-md shadow-brand4 drop-shadow-md w-10 h-[42px] flex items-center justify-center gap-[3px]">
        <span
          className={`bg-rose-600 w-1 h-1 rounded-[50%] ${
            isLoading ? "animate-[ballBupmpingBounce_1s_linear_infinite]" : ""
          }`}
        ></span>
        <span
          className={`bg-indigo-500 w-1 h-1 rounded-[50%] ${
            isLoading ? "animate-[ballBupmpingBounce_1.5s_linear_infinite]" : ""
          }`}
        ></span>
        <span
          className={`bg-emerald-400 w-1 h-1 rounded-[50%] ${
            isLoading ? "animate-[ballBupmpingBounce_2s_linear_infinite]" : ""
          }`}
        ></span>
      </div>
      <div className="text-sm font-medium tracking-wide uppercase cursor-default rounded-lg bg-brand4 shadow-md shadow-brand4 drop-shadow-md w-32 h-[42px] flex items-center justify-center gap-[3px]">
        {startIndex} to {endIndex} of {totalItems}
      </div>
      <div
        onClick={handleGo}
        className={`text-base text-black font-medium tracking-wide uppercase cursor-pointer rounded-lg bg-brand4 shadow-md shadow-brand4 drop-shadow-md duration-700 transition-all w-24 h-[42px] flex items-center justify-center gap-3 ${
          currPage !== totalPage ? "active:scale-x-105" : ""
        }`}
      >
        Go
        <MdArrowRight
          className={`text-lg text-white rounded-[50%] ${
            currPage === totalPage
              ? "bg-gradient-to-br from-rose-800 to-rose-400"
              : "bg-gradient-to-br from-indigo-800 to-indigo-400"
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
