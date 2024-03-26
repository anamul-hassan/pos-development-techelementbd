import { FC } from "react";
import InputWrapper from "./form/InputWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import ButtonLoader from "./loader/ButtonLoader";
import { useGetBranchesQuery } from "@/store/branch/branchApi";

interface IBranchSelectorInputProps {
  error: any;
  setError: any;
  setBranch: (branch: number) => void;
  branch: number | undefined;
  className?: string;
}

const BranchSelectorInput: FC<IBranchSelectorInputProps> = ({
  error,
  setError,
  setBranch,
  branch,
  className,
}) => {
  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } = useGetBranchesQuery(
    {}
  );
  return (
    <InputWrapper
      className={className}
      label="Select Branch ✽"
      labelFor="branch"
      error={error?.branchId?.message}
    >
      <Select
        value={branch?.toString()}
        onValueChange={(value: string) => {
          setBranch(+value);
          setError("branchId", { type: "custom", message: "" });
        }}
      >
        <SelectTrigger id="branch" className="">
          <SelectValue placeholder="Select branch" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {branchList?.data?.length > 0 &&
            branchList?.data?.map((singleBranch: any) => (
              <SelectItem
                key={singleBranch?.id}
                value={singleBranch?.id?.toString()}
              >
                {capitalizeEveryWord(singleBranch?.branchName)}
              </SelectItem>
            ))}
          {!branchList?.data?.length && branchLoading && (
            <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
              <ButtonLoader />
            </div>
          )}
        </SelectContent>
      </Select>
    </InputWrapper>
  );
};

export default BranchSelectorInput;
