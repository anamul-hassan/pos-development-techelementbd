import { FC, useState } from "react";

interface IReportSelector {
  options: any;
  selectedOption: any;
  setSelectedOption: any;
}

const ReportSelector: FC<IReportSelector> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearchInputClick = (e: any) => {
    e.stopPropagation(); // Prevents the event from reaching the parent div and closing the dropdown
  };

  const options = ["All", "Samsung", "Vivo", "iPhone"];

  return (
    <div className="relative w-full">
      <div
        className="border border-gray-400 px-2 py-1 cursor-pointer"
        onClick={handleSelectClick}
      >
        <div className="flex justify-between items-center">
          <span>{selectedOption || "All"}</span>
          <div className={`${isOpen ? "rotate-180 duration-500" : ""}`}>
            {/* {ICONS.arrow} */}
          </div>
        </div>
        {isOpen && (
          <div
            className="absolute top-[30px] left-0 w-full border z-[99999] border-gray-400 mt-1 bg-white"
            onClick={() => setIsOpen(false)}
          >
            <input
              type="text"
              placeholder="Search..."
              className="border-gray-300 focus:border-gray-300 z-[99999] focus:outline-none focus:border-none ml-0.5 my-1 py-1"
              onChange={handleSearchChange}
              value={searchTerm}
              onClick={handleSearchInputClick} // Add this line to handle click on the search input
            />
            {options
              .filter((option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((option) => (
                <div
                  key={option}
                  className="cursor-pointer px-2 z-[99999] py-1 hover:bg-gray-300"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSelector;
