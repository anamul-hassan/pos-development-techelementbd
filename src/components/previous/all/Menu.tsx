import React, { FC } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface MenuLink {
  icon: any;
  to: any;
  title: any;
}

export const MenuLink: FC<MenuLink> = ({ icon, to, title }) => {
  return (
    <Link className="flex items-center gap-2 w-full h-full" to={to}>
      {icon}
      {title}
    </Link>
  );
};

interface Menu {
  isHover: any;
  isSidebar: any;
  title: any;
  icon: any;
  children: any;
  currentIndex: any;
  setIndex: any;
  index: any;
}

export const Menu: FC<Menu> = ({
  isHover,
  isSidebar,
  title,
  icon,
  children,
  currentIndex,
  setIndex,
  index: i,
}) => {
  const isOpen = currentIndex === i;

  const toggleAccordion = () => {
    setIndex(isOpen ? null : i);
  };
  return (
    <div className="overflow-hidden">
      <label
        onClick={toggleAccordion}
        className={`flex items-center justify-between gap-2 w-full duration-1000 transition-colors bg-brand5 hover:bg-brand3 py-2 ${
          isHover || isSidebar ? "px-4" : "px-6"
        } text-lg cursor-pointer tracking-wide text-brand4 rounded-sm my-0 relative ${
          isOpen
            ? "after:content-[''] after:absolute after:w-1 after:h-full after:bg-emerald-400 after:rounded-md after:left-0 after:top-0"
            : ""
        } w-full group`}
      >
        <div className={`flex items-center gap-2`}>
          {icon}
          {(isSidebar || isHover) && (
            <label className="w-full h-full">
              <span className="cursor-pointer">{title}</span>
            </label>
          )}
        </div>
        {(isSidebar || isHover) && (
          <FaLongArrowAltRight
            className={`text-[1.1rem] duration-300 transition opacity-[.3] group-hover:opacity-100 group-hover:translate-x-2 group-hover:scale-90 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        )}
      </label>
      {(isSidebar || isHover) && (
        <ul
          className={`pl-1 overflow-hidden transition duration-300 bg-[#175c7de4] w-full ${
            isOpen ? "h-fit" : "h-0"
          }`}
        >
          {React.Children.map(children, (child, index) => (
            <li
              key={index}
              className="border-l-4 border-l-indigo-500 duration-1000 bg-[#417890] transition-colors hover:bg-brand3 py-2 px-2 mr-2 text-base cursor-pointer tracking-wide text-brand4 rounded-sm my-1"
            >
              {child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
