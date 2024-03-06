import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

interface AccrodionLink {
  icon: any;
  to: any;
  title: any;
}

export const AccrodionLink: FC<AccrodionLink> = ({ icon, to, title }) => {
  return (
    <li className="flex items-center gap-2 bg-brand6 duration-300 transition-colors active:bg-brand3 py-2 px-2 text-xs tracking-wide text-brand4 rounded-sm my-[2px] first:my-0">
      <Link to={to} className="flex items-center gap-2 w-full">
        {icon}
        {title}
      </Link>
    </li>
  );
};

interface Accrodion {
  title: any;
  Icon: any;
  id: any;
  children: any;
}

export const Accrodion: FC<Accrodion> = ({ title, Icon, id, children }) => {
  return (
    <>
      <label
        htmlFor={id}
        className="flex items-center justify-between gap-2 w-full h-full bg-[#33849a] duration-300 transition-colors active:bg-[#30788d] py-2 px-2 text-sm tracking-wide text-[#ffffff] rounded-sm my-[2px]"
      >
        <div className="flex items-center gap-2">
          {Icon}
          {title}
        </div>
        <IoIosArrowDown className="text-[1.1rem]" />
      </label>
      <input
        className="hidden w-[100%] h-[100%] peer"
        type="checkbox"
        id={id}
      />
      <ul className="mt-1 hidden h-0 duration-1000 peer-checked:h-auto peer-checked:block peer-checked:transition-all">
        {children}
      </ul>
    </>
  );
};
