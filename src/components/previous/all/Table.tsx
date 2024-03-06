import { FC } from "react";

interface TType {
  children?: any;
}

export const Table: FC<TType> = ({ children }) => {
  return (
    <div
      className={`w-[100%] h-[100%] bg-brand4 relative overflow-auto rounded-[.3rem] border-collapse`}
    >
      <table className="w-full h-full table-auto border-collapse">
        {children}
      </table>
    </div>
  );
};

export const THeader: FC<TType> = ({ children }) => {
  return (
    <thead className="w-fit h-fit">
      <tr className="text-center sticky left-0 top-0 z-[9999]">{children}</tr>
    </thead>
  );
};

export const TBody: FC<TType> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TFooter: FC<TType> = ({ children }) => {
  return (
    <tfoot>
      <tr className="w-[100%] bg-[#6cdba7] text-center border-collapse border-t border-t-[#151515]">
        {children}
      </tr>
    </tfoot>
  );
};

export const Tbrow: FC<TType> = ({ children }) => {
  return (
    <tr className="w-[100%] h-fit py-[2rem] text-center border-b border-b-[#ffffff] first:border-b last:border-b-0 cursor-default even:bg-[#fefbff] odd:bg-[#fdfcf7] hover:bg-[#e9fbf9] duration-300 transition-colors">
      {children}
    </tr>
  );
};

interface TD {
  row?: any;
  column?: any;
  children?: any;
}
export const Td: FC<TD> = ({ row, column, children }) => {
  return (
    <td
      rowSpan={row}
      colSpan={column}
      className="text-[1rem] text-[#000] font-[500] border-collapse tracking-wide p-2 cursor-default border border-brand first:border-l-0 last:border-r-0"
    >
      {children}
    </td>
  );
};

export const Th: FC<TType> = ({ children }) => {
  return (
    <th className="text-[1rem] font-[500] bg-brand3 text-white cursor-default border-collapse tracking-wide p-2 border border-brand4  first:border-l-0 last:border-r-0">
      {children}
    </th>
  );
};
