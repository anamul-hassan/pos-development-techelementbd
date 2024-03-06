import { IoClose } from "react-icons/io5";
import { FC } from "react";
import Button from "./Button";

interface ModalHead {
  setIsModal?: any;
  title?: any;
}
export const ModalHead: FC<ModalHead> = ({ setIsModal, title }) => {
  return (
    <header className="flex items-center justify-between pb-4">
      <h1 className="text-lg text-[#000] font-semibold tracking-wide">
        {title}
      </h1>
      <Button handleClick={setIsModal}>
        <IoClose className="text-white text-[1.1rem]" />
      </Button>
    </header>
  );
};

interface ModalBody {
  children?: any;
}
export const ModalBody: FC<ModalBody> = ({ children }) => {
  return <main>{children}</main>;
};

interface ModalFooter {
  children?: any;
}
export const ModalFooter: FC<ModalFooter> = ({ children }) => {
  return (
    <footer className="flex items-center justify-end pt-4">{children}</footer>
  );
};

interface Modal {
  isModal?: any;
  children?: any;
  width?: any;
  height?: any;
  modal_bg?: any;
}

export const Modal: FC<Modal> = ({
  isModal,
  children,
  width = "450px",
  height = "200px",
  modal_bg = "bg-brand8",
}) => {
  return (
    <div
      className={`w-[100vw] h-[100vh] ${modal_bg} fixed top-0 left-0 right-0 z-[3000000] duration-300 transition-all ${
        isModal ? "scale-[1] opacity-[1]" : "scale-[0] opacity-[0]"
      }`}
    >
      <div
        className={`${width} ${height} bg-[rgb(255,255,255)] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md p-4 duration-300 transition-all shadow-md shadow-brand4 drop-shadow-md ${
          isModal ? "scale-[1] opacity-[1]" : "scale-[0] opacity-[0]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
