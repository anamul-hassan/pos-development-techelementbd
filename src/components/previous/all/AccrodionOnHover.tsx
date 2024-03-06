import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

interface AccrodionOnHoverLink {
  icon: any;
  to: any;
  title: any;
}

export const AccrodionOnHoverLink: FC<AccrodionOnHoverLink> = ({
  icon,
  to,
  title,
}) => {
  return (
    <li className="duration-300 bg-[#3c6171] transition-colors active:bg-brand3 py-2 px-2 mr-2 text-base cursor-pointer tracking-wide text-brand4 rounded-sm my-1">
      <Link className="flex items-center gap-2 w-full" to={to}>
        {icon}
        {title}
      </Link>
    </li>
  );
};

interface AccrodionOnHover {
  isHover: any;
  isSidebar: any;
  title: any;
  icon: any;
  children: any;
}
export const AccrodionOnHover: FC<AccrodionOnHover> = ({
  isHover,
  isSidebar,
  title,
  icon,
  children,
}) => {
  const [hover, setHover] = useState(false);
  const toggle = () => {
    setHover((action) => !action);
  };
  return (
    <>
      <label
        onMouseEnter={toggle}
        className="flex items-center justify-between gap-2 duration-300 transition-colors active:bg-brand3 py-2 px-4 text-lg cursor-pointer tracking-wide text-brand4 rounded-sm my-0"
      >
        <div className="flex items-center gap-2">
          {icon}
          {(isSidebar || isHover) && (
            <label className="w-full h-full">
              <span className="cursor-pointer">{title}</span>
            </label>
          )}
        </div>
        {(isSidebar || isHover) && (
          <IoIosArrowDown
            className={`text-[1.1rem] duration-300 transition ${
              hover ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </label>
      {(isSidebar || isHover) && (
        <ul
          className={`pl-3 duration-1000 transition-all ease-in-out ${
            hover ? "h-fit block" : "h-0 hidden"
          }`}
        >
          {children}
        </ul>
      )}
    </>
  );
};
