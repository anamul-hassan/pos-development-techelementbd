import { useEffect } from "react";

export const useCloseOutsideClick = (setControl: any, Ref: any) => {
  useEffect(() => {
    const controlCompo = (e: any) => {
      if (!Ref.current.contains(e.target)) {
        setControl(false);
      }
    };
    document.addEventListener("mousedown", controlCompo);
    return () => {
      document.removeEventListener("mousedown", controlCompo);
    };
  }, [setControl, Ref]);
};
