import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import PhotoLazyLoadWrapper from "@/components/common/photo/PhotoLazyLoadWrapper";
import { FC } from "react";
import Heading from "@/components/common/typography/Heading";

interface IProductDetailsProps {
  actionItem: any;
}

const ProductDetails: FC<IProductDetailsProps> = ({ actionItem }) => {
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary"> Product Details </Heading>
      {/* PERSONAL INFORMATION */}
      <div>
        <div>
          <PhotoLazyLoadWrapper
            className="size-20 border-[0.5px] border-tertiary/40 rounded-md"
            src={actionItem?.image}
            alt={actionItem?.productName}
          />
          <Heading className="my-2" variant="secondary">
            Product Information
          </Heading>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Product Name"
              paragraph={actionItem?.productName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Brand Name"
              paragraph={actionItem?.brand?.dummyBrand || "Not found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Brand Note"
              paragraph={actionItem?.brand?.note || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Category Name"
              paragraph={actionItem?.category?.categoryName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Category Code"
              paragraph={actionItem?.category?.categoryCode || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Sub-category Name"
              paragraph={
                actionItem?.subCategory?.subCategoryName || "Not Found"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Unit Name"
              paragraph={actionItem?.unit?.dummyName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Unit Short-name"
              paragraph={actionItem?.unit?.shortName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Unit Decimal Status"
              paragraph={actionItem?.unit?.allowDecimal || "Not Found"}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductDetails;
