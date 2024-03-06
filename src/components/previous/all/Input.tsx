import { FC } from "react";

interface Input {
  Icon?: any;
  name?: any;
  placeholder: any;
  setValues?: any;
}
const Input: FC<Input> = ({ Icon, name, placeholder, setValues }) => {
  return (
    <>
      <div className="flex items-center w-full h-[45px]">
        <span className="flex items-center justify-center text-base w-[60px] h-full rounded-l-md bg-brand3 text-white border-r-none">
          {Icon}
        </span>

        <div className="w-full h-full border border-brand relative flex items-center rounded-tr-md rounded-br-md">
          <input
            className="w-full h-full outline-0 border-none text-base text-black font-normal tracking-wide ps-2 pr-6 rounded-tr-md rounded-br-md placeholder:text-gray-400 peer "
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={(e) => setValues(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
