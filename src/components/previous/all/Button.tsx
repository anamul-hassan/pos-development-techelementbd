import { FC } from "react";

interface Button {
  children?: any;
  handleClick?: any;
  bgColor?: any;
  bgHoverColor?: any;
  rounded?: any;
  type?: any;
}
const Button: FC<Button> = ({
  children,
  handleClick,
  bgColor = "bg-[#1c7867]",
  bgHoverColor = "hover:bg-[#28937f]",
  rounded = "rounded-sm",
  type,
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`text-[rgb(255,255,255)] text-base font-[500] tracking-wide flex items-center gap-2 
            ${bgColor} ${bgHoverColor} py-2 px-3 ${rounded} shadow-inner shadow-[#535353] 
            duration-1000 transition-all active:scale-[.9]
            `}
    >
      {children}
    </button>
  );
};

export default Button;
