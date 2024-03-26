import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import { FC } from "react";

interface IProductCategoryDetailsProps {
  actionItem: any;
}

const ProductCategoryDetails: FC<IProductCategoryDetailsProps> = ({
  actionItem,
}) => {
  return (
    <section className="space-y-4">
      {/* PERSONAL INFORMATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Category Information</h3>
        <ul className="grid grid-cols-1 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Category Name"
              paragraph={actionItem?.categoryName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Category Code"
              paragraph={actionItem?.categoryCode || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Category Description"
              paragraph={actionItem?.description || "Not Found"}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductCategoryDetails;
