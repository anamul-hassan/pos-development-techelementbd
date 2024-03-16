import HeadingParagraph from "@/components/common/HeadingParagraph";
import { useGetSingleBranchQuery } from "@/store/branch/branchApi";

import { FC } from "react";

interface IAccountDetailsProps {
  actionItem: any;
}

const AccountDetails: FC<IAccountDetailsProps> = ({ actionItem }) => {
  const { data: branchData } = useGetSingleBranchQuery(
    actionItem?.branchId
  ) as any;

  return (
    <section className="space-y-4">
      {/* ACCOUNT INFORMATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Account Information</h3>
        <ul className="grid grid-cols-1 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Bank Name"
              paragraph={actionItem?.dummyBankName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Account Name"
              paragraph={actionItem?.dummyAccountName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Account Holder Name"
              paragraph={actionItem?.dummyHolderName || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Account Number"
              paragraph={actionItem?.accountNumber || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Account Type"
              paragraph={actionItem?.accountType || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Account For "
              paragraph={branchData?.data?.branchName || "Not Found"}
            />
          </li>
        </ul>
      </div>
      {/* GENERAL INFORMATION */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">General Information</h3>
        <ul className="grid grid-cols-1 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Current Balance"
              paragraph={
                actionItem?.currentBalance
                  ? actionItem?.currentBalance.toFixed(2) + "৳"
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

export default AccountDetails;
