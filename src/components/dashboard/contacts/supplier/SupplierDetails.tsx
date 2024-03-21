import HeadingParagraph from "@/components/common/HeadingParagraph";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { FC } from "react";

interface ISupplierDetailsProps {
  actionItem: any;
}

const SupplierDetails: FC<ISupplierDetailsProps> = ({ actionItem }) => {
  return (
    <section className="space-y-4 font-anek">
      {/* PERSONAL INFORMATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Personal Information</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Name"
              paragraph={actionItem?.dummyName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Email"
              paragraph={actionItem?.dummyEmail}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Membership ID"
              paragraph={actionItem?.memberShipId || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Activity Status"
              paragraph={actionItem?.active ? "Activate" : "Deactivate"}
            />
          </li>
          <li>
            <HeadingParagraph heading="Phone" paragraph={actionItem?.phone} />
          </li>
          <li>
            <HeadingParagraph
              heading="Current Address"
              paragraph={capitalizeEveryWord(
                actionItem?.address || "Not Found"
              )}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="City"
              paragraph={capitalizeEveryWord(actionItem?.city || "Not Found")}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Pay Term"
              paragraph={actionItem?.peyTerm || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Tax"
              paragraph={actionItem?.tax || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Zip Code"
              paragraph={actionItem?.zipCode || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Under The Branch"
              paragraph={actionItem?.branch?.branchName || "Not Found"}
            />
          </li>
        </ul>
      </div>
      {/* GENERAL INFORMATION */}
      <div className="">
        <h3 className="text-2xl font-semibold mb-2">General Information</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Pay Status"
              paragraph={actionItem?.paidStatus || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Due Amount"
              paragraph={
                actionItem?.dueAmount
                  ? actionItem?.dueAmount?.toFixed(2) + "৳"
                  : "0.00৳"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Advance Amount"
              paragraph={
                actionItem?.advanceAmount
                  ? actionItem?.advanceAmount?.toFixed(2) + "৳"
                  : "0.00৳"
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Opening Balance"
              paragraph={
                actionItem?.openingBalance
                  ? actionItem?.openingBalance?.toFixed(2) + "৳"
                  : "0.00৳"
              }
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SupplierDetails;
