import Heading from "@/components/common/typography/Heading";
import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { FC } from "react";

interface ICustomerDetailsProps {
  actionItem: any;
}

const CustomerDetails: FC<ICustomerDetailsProps> = ({ actionItem }) => {
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary">Customer Details</Heading>
      {/* PERSONAL INFORMATION */}
      <div>
        <Heading variant="secondary">Personal Information</Heading>
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
              heading="Family Phone"
              paragraph={actionItem?.familyPhone || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Alternative Phone"
              paragraph={actionItem?.alternatePhone || "Not Found"}
            />
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
              heading="Permanent Address"
              paragraph={capitalizeEveryWord(
                actionItem?.permanentAddress || "Not Found"
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
              heading="Gender"
              paragraph={actionItem?.gender || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Department"
              paragraph={actionItem?.department || "Not Found"}
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
        </ul>
      </div>
      {/* GENERAL INFORMATION */}
      <div>
        <Heading variant="secondary">General Information</Heading>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Collected Point"
              paragraph={actionItem?.point || "0"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Point Amount"
              paragraph={
                actionItem?.pointAmount
                  ? actionItem?.pointAmount?.toFixed(2) + "৳"
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

export default CustomerDetails;
