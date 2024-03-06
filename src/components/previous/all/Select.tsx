import React, { FC, useEffect, useRef, useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useCloseOutsideClick } from "../Hooks/useCloseOutsideClick/useCloseOutsideClick";

interface Option {
  onClick?: any;
  children: any;
  value: any;
}
export const Option: FC<Option> = ({ onClick, children, value }) => {
  const handleClick = () => {
    onClick({ title: children, value });
  };
  return (
    <div
      onClick={handleClick}
      className="text-sm text-black font-medium tracking-wider w-full h-fit first:rounded-t-md last:rounded-b-md last:border-b-0 border-b border-b-brand outline-none p-2 bg-[#ffffff] hover:bg-gradient-to-t from-[#fdf8f8] to-[#eaeaea] cursor-pointer duration-500 transition-colors"
    >
      {children}
    </div>
  );
};

interface Select {
  children?: any;
  name: any;
  label?: any;
  setValue?: any;
  onChange?: any;
  defaultValue?: any;
}

export const Select: FC<Select> = ({
  children,
  name,
  label = "Select Choice",
  setValue,
  // onChange,
  // defaultValue,
}) => {
  const selectRef = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState(label);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectPosition, setSelectPosition] = useState(false);
  useCloseOutsideClick(setIsSelectOpen, selectRef);

  const handleSelectClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleOptionClick = ({ title, value }: any) => {
    setSelectedItem(title);
    setIsSelectOpen(false);
    setValue(name, value);
  };

  useEffect(() => {
    const content = selectRef?.current?.getBoundingClientRect() as any;
    const above = content?.top;
    const bellow = window.innerHeight - content?.bottom;
    setSelectPosition(above > bellow);
  }, [isSelectOpen]);

  return (
    <div
      ref={selectRef}
      className="w-full h-10 border border-brand bg-[#f2f2f2] hover:bg-brand4 duration-500 transition-colors rounded-md py-2 ps-2 flex items-center justify-between cursor-pointer relative"
    >
      <div
        id={name}
        className="w-full h-10 flex items-center text-base text-black font-medium tracking-wider ps-1"
        onClick={handleSelectClick}
      >
        {selectedItem}
      </div>
      <span className="bg-brand h-10 w-12 rounded-r-md flex items-center justify-center">
        <IoIosArrowRoundDown
          className={`text-2xl text-white duration-300 transition-all ${
            isSelectOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </span>
      <div
        className={`absolute left-0 ${
          selectPosition ? "bottom-11" : "top-11"
        } z-50 w-[260px] h-fit bg-transparent rounded-md shadow-sm shadow-brand4 drop-shadow-sm ${
          isSelectOpen ? "block" : "hidden"
        }`}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: ({ title, value }: any) =>
              handleOptionClick({ title, value }),
          })
        )}
      </div>
    </div>
  );
};
