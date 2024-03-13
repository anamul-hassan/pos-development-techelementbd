import PhotoLazyLoadWrapper from "@/components/common/photo/PhotoLazyLoadWrapper";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { FC } from "react";

interface IProductDetailsProps {
  actionItem: any;
}

const ProductDetails: FC<IProductDetailsProps> = ({ actionItem }) => {
  return (
    <section className="flex items-center  gap-4 my-4">
      <div className="w-1/2">
        <PhotoLazyLoadWrapper className="rounded-md" src="" alt="" />
      </div>
      <div className="w-1/2 flex flex-col">
        <h3 className="text-2xl font-semibold">Product Information</h3>
        {/* PRODUCT NAME */}
        <ul className="text-lg mb-2">
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Product Name</label>
            <p>{capitalizeEveryWord(actionItem?.productName) || "N/A"}</p>
          </li>
        </ul>
        {/* BRAND INFORMATION */}
        <h3 className="text-base font-semibold">Brand Information</h3>
        <ul className="text-sm mb-2 space-y-1">
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Name</label>
            <p>{capitalizeEveryWord(actionItem?.brand?.brand) || "N/A"}</p>
          </li>
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Description</label>
            <p>{capitalizeEveryWord(actionItem?.brand?.note) || "N/A"}</p>
          </li>
        </ul>
        {/* CATEGORY INFORMATION */}
        <h3 className="text-base font-semibold">Category Information</h3>
        <ul className="text-sm mb-2 space-y-1">
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Name</label>
            <p>
              {capitalizeEveryWord(actionItem?.category?.categoryName) || "N/A"}
            </p>
          </li>
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Description</label>
            <p>
              {capitalizeEveryWord(actionItem?.category?.description) || "N/A"}
            </p>
          </li>
        </ul>
        {/* SUB CATEGORY INFORMATION */}
        <h3 className="text-base font-semibold">Sub-category Information</h3>
        <ul className="text-sm mb-2">
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Name</label>
            <p>
              {capitalizeEveryWord(actionItem?.subCategory?.subCategoryName) ||
                "N/A"}
            </p>
          </li>
        </ul>
        {/* UNIT INFORMATION */}
        <h3 className="text-base font-semibold">Unit Information</h3>
        <ul className="text-sm mb-2">
          <li className="flex space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Unit</label>
            <p>{capitalizeEveryWord(actionItem?.unit?.name) || "N/A"}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProductDetails;
