import { LuEye, LuEyeOff } from "react-icons/lu";
import { FC, useState } from "react";
import { getErrorMassageByProperty } from "../Hooks/getErrorMessageProperty";

interface InputField {
  isPassword?: any;
  isIcon?: any;
  type?: any;
  Icon?: any;
  label?: any;
  register?: any;
  errors?: any;
  name?: any;
  value?: any;
  defaultValue?: any;
  placeholder?: any;
  labelColor?: any;
  required?: any;
}
const InputField: FC<InputField> = ({
  isPassword,
  isIcon,
  type,
  Icon,
  label,
  register,
  errors = null,
  name,
  value,
  defaultValue,
}) => {
  if (errors) {
    errors = getErrorMassageByProperty(errors, name);
  }
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      <div className="flex items-center w-full h-[40px]">
        {isIcon === true && (
          <span className="flex items-center justify-center text-[1.6rem] w-[60px] h-full rounded-l-md bg-brand text-white border-r-none">
            {Icon}
          </span>
        )}

        <div
          className={`w-full h-full border border-brand relative flex items-center 
        ${
          isIcon === false && isPassword === false
            ? "rounded-md"
            : isIcon === false
            ? "rounded-l-md"
            : isPassword === false
            ? "rounded-r-md"
            : "rounded-none"
        }`}
        >
          <input
            className={`w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-4 pr-2 peer 
            ${
              isIcon === false && isPassword === false
                ? "rounded-md"
                : isIcon === false
                ? "rounded-l-md"
                : isPassword === false
                ? "rounded-r-md"
                : "rounded-none"
            }`}
            required
            type={isPassword === true ? (!isShow ? "text" : "password") : type}
            name={name}
            {...register(name)}
            id={name}
            defaultValue={defaultValue}
            value={value}
          />
          <label className="text-sm text-black tracking-wide font-medium z-10 duration-700 ease-in-out transition-transform leading-3 pointer-events-none uppercase absolute top-[5px] left-2 px-2 py-2 bg-white peer-valid:text-xs peer-focus:text-xs peer-valid:-translate-y-[14px] peer-focus:-translate-y-[14px] peer-valid:translate-x-1 peer-focus:translate-x-1 peer-valid:p-[0px_4px] peer-focus:p-[0px_4px] peer-valid:text-indigo-400 peer-focus:text-indigo-400 peer-valid:bg-white peer-focus:bg-white peer-valid:border-l peer-focus:border-l peer-valid:border-l-indigo-500 peer-focus:border-l-indigo-500 peer-valid:border-r peer-focus:border-r peer-valid:border-r-indigo-500 peer-focus:border-r-indigo-500">
            {label}
          </label>
        </div>

        {isPassword === true && (
          <span
            onClick={() => setIsShow(!isShow)}
            className="flex items-center justify-center w-[60px] h-full text-xl text-white rounded-r-md bg-brand cursor-pointer duration-300 transition"
          >
            {!isShow ? <LuEye /> : <LuEyeOff />}
          </span>
        )}
      </div>
      <small className="text-red-500 line-clamp-6 leading-[1] ps-2">
        {errors}
      </small>
    </>
  );
};

export default InputField;
