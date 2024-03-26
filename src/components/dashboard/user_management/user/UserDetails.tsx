import HeadingParagraph from "@/components/common/typography/HeadingParagraph";
import PhotoLazyLoadWrapper from "@/components/common/photo/PhotoLazyLoadWrapper";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { fullNameConverter } from "@/utils/helpers/fullNameConverter";
import { FC } from "react";
import Heading from "@/components/common/typography/Heading";

interface IUserDetailsProps {
  actionItem: any;
}

const UserDetails: FC<IUserDetailsProps> = ({ actionItem }) => {
  return (
    <section className="space-y-4 font-anek">
      <Heading variant="primary">User Details</Heading>
      {/* PERSONAL INFORMATION */}
      <div>
        <div>
          <PhotoLazyLoadWrapper
            className="size-20 border-[0.5px] border-tertiary/40 rounded-md"
            src={actionItem?.avatar}
            alt={fullNameConverter(actionItem?.firstName, actionItem?.lastName)}
          />
          <Heading variant="secondary">Personal Information</Heading>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-3 md:gap-x-6">
          <li>
            <HeadingParagraph
              heading="Name"
              paragraph={capitalizeEveryWord(
                fullNameConverter(actionItem?.firstName, actionItem?.lastName)
              )}
            />
          </li>
          <li>
            <HeadingParagraph heading="Email" paragraph={actionItem?.email} />
          </li>
          <li>
            <HeadingParagraph
              heading="Activity Role"
              paragraph={actionItem?.dummyRole}
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
                actionItem?.currentAddress || "Not Found"
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
              heading="Active Status"
              paragraph={actionItem?.dummyActive}
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
              heading="Blood Group"
              paragraph={actionItem?.bloodGroup?.toUpperCase() || "Not Found"}
            />
          </li>
          <li>
            <HeadingParagraph
              heading="Marital Status"
              paragraph={actionItem?.maritialStatus || "Not Found"}
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
              heading="Facebook Link"
              paragraph={
                <a
                  href={actionItem?.facebook || "https://www.facebook.com/"}
                  target="_blank"
                  className=""
                >
                  {actionItem?.facebook || "https://www.facebook.com/"}
                </a>
              }
            />
          </li>
          <li>
            <HeadingParagraph
              heading="X (Twitter) Link"
              paragraph={
                <a
                  href={actionItem?.twitter || "https://twitter.com/"}
                  target="_blank"
                  className=""
                >
                  {actionItem?.twitter || "https://twitter.com/"}
                </a>
              }
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default UserDetails;
