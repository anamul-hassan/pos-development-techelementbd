import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { FC } from "react";

interface ISupplierDetailsProps {
  actionItem: any;
}

const SupplierDetails: FC<ISupplierDetailsProps> = ({ actionItem }) => {
  return (
    <section className="space-y-4">
      {/* PERSONAL INFORMATION */}
      <div className="">
        <h3 className="text-2xl font-semibold border-b mb-2">
          Personal Information
        </h3>
        <ul className="grid grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6">
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Name</label>
            <p>
              {capitalizeEveryWord(
                fullNameConverter(actionItem?.firstName, actionItem?.lastName)
              ) || "N/A"}
            </p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Email</label>
            <p className="lowercase">{actionItem?.email || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Membership ID</label>
            <p>{actionItem?.memberShipId || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Phone</label>
            <p>{actionItem?.phone || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Address</label>
            <p>{capitalizeEveryWord(actionItem?.address) || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">City</label>
            <p>{capitalizeEveryWord(actionItem?.city) || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">State</label>
            <p>{capitalizeEveryWord(actionItem?.state) || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">ZIP Code</label>
            <p>{capitalizeEveryWord(actionItem?.zipCode) || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Status</label>
            <p>{actionItem?.active ? "Activated" : "Deactivated"}</p>
          </li>
        </ul>
      </div>
      {/* GENERAL INFORMATION */}
      <div className="">
        <h3 className="text-2xl font-semibold border-b mb-2">
          General Information
        </h3>
        <ul className="grid grid-cols-3 gap-y-2 gap-x-3 md:gap-x-6">
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Opening Balance</label>
            <p>{actionItem?.openingBalance?.toFixed(2) || "0.00"}৳</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Advance Amount</label>
            <p>{actionItem?.advanceAmount?.toFixed(2) || "0.00"}৳</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Due Amount</label>
            <p>{actionItem?.dueAmount?.toFixed(2) || "0.00"}৳</p>
          </li>
          <li className="flex items-center space-x-1 border bg-accent px-2 rounded-full">
            <label className="font-semibold">Paid Status</label>
            <p>{capitalizeEveryWord(actionItem?.paidStatus) || "N/A"}</p>
          </li>
          <li className="flex items-center space-x-1  border bg-accent px-2 rounded-full">
            <label className="font-semibold">Pay Term</label>
            <p>{capitalizeEveryWord(actionItem?.peyTerm) || "N/A"}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SupplierDetails;
