import { FC, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useCloseOutsideClick } from "../Hooks/useCloseOutsideClick/useCloseOutsideClick";

interface DropActionList {
  onClick?: any;
  children?: any;
}

export const DropActionList: FC<DropActionList> = ({ onClick, children }) => {
  return (
    <li
      onClick={onClick}
      className="text-xs text-white font-semibold tracking-wide px-2 py-1 uppercase w-full h-8 flex items-center justify-between gap-1 whitespace-nowrap rounded-sm mb-[2px] last:mb-0 bg-brand hover:bg-blue-800 shadow-inner shadow-brand duration-300 transition-colors cursor-pointer"
    >
      {children}
    </li>
  );
};

interface DropAction {
  children: any;
}
export const DropAction: FC<DropAction> = ({ children }) => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useCloseOutsideClick(setIsOpen, dropDownRef);
  return (
    <div ref={dropDownRef} className="relative">
      <label
        onClick={() => setIsOpen(!isOpen)}
        className="w-fit h-fit text-sm text-white font-medium tracking-wider flex items-center gap-3 bg-[#512da8] hover:bg-[#1e6860] duration-500 transition-colors py-1 px-2 rounded-[4px] cursor-pointer"
      >
        Action{" "}
        <IoIosArrowDown
          className={`duration-200 transition-all ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </label>
      <ul
        className={`w-[170px] h-fit bg-slate-100 shadow-sm shadow-blue-200 absolute left-0 top-9 rounded-sm p-1 z-[100] duration-300 transition-all ${
          isOpen ? "block opacity-[1]" : "hidden opacity-0"
        }`}
      >
        {children}
      </ul>
    </div>
  );
};
