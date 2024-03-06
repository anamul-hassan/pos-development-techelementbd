import { FC, ReactNode } from "react";

interface IHeadingParagraphProps {
  heading: string | ReactNode;
  paragraph: string | ReactNode;
}

const HeadingParagraph: FC<IHeadingParagraphProps> = ({
  heading,
  paragraph,
}) => {
  return (
    <div>
      {/* HEADING */}
      {heading && <h4>{heading || "Data not found"}</h4>}
      {/* PARAGRAPH */}
      {paragraph && <p>{paragraph || "Data not found"}</p>}
    </div>
  );
};

export default HeadingParagraph;
