import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { addEditUserSchema } from "@/schemas/user/add_user_schema";

import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useAddThumbnailMutation } from "@/store/file/fileApi";
import { useUpdateUserMutation } from "@/store/user/userApi";
import { ADD_EDIT_USER_FORM } from "@/utils/constants/user_management/add_edit_user_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";

import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarIcon,
  LucideEye,
  LucideEyeOff,
} from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuLoader2, LuPlus } from "react-icons/lu";
import AddBranch from "../branch/AddBranch";
import { BLOOD_GROUPS } from "@/utils/constants/common/blood_groups";
import { GENDER_OPTIONS } from "@/utils/constants/common/gender_options";
import { MARITAL_STATUS_OPTIONS } from "@/utils/constants/common/marital_status_options";
import { USER_ROLE_OPTIONS } from "@/utils/constants/common/user_role_options";

interface IAddUserProps {
  actionItem: any;
}

const EditUser: FC<IAddUserProps> = ({ actionItem }) => {
  const locale = "en";
  const { branchId } = shareBranchAndUserInfo();
  const [branch, setBranch] = useState<number>(
    branchId || actionItem?.branchId
  );
  const { toast } = useToast();

  // PASSWORD VISIBILITY STATE
  const [visible, setVisible] = useState(false);
  const [addBranchOpen, setAddBranchOpen] = useState(false);

  const [date, setDate] = useState<Date>();

  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  //   EDIT USER MUTATION
  const [updateUser, { isLoading: loadingEditUser, error: editUserError }] =
    useUpdateUserMutation() as any;
  // ADD THUMBNAIL MUTATION
  const [
    // ADD THUMBNAIL OR AVATAR MUTATION
    { isLoading: addThumbnailLoading, isSuccess: addThumbnailSuccess },
  ] = useAddThumbnailMutation({}) as any;

  // REACT HOOK FORM TO ADD USER
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({ resolver: yupResolver(addEditUserSchema) });

  const handleEditUser = async (data: any) => {
    // ADD THUMBNAIL DATA TO THE USER DATA
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "avatar",
      "lastName",
      "dateOfBirth",
      "gender",
      "dateOfBirth",
      "bloodGroup",
      "maritialStatus",
      "alternatePhone",
      "familyPhone",
      "currentAddress",
      "permanentAddress",
      "facebook",
      "twitter",
      "fileAttachment",
      "password",
    ]);

    const result = await updateUser({
      id: actionItem?.id,
      data: updateData,
    });
    if (result?.data?.success) {
      toast({
        title: "Update User Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setDate(actionItem.dateOfBirth);
    setValue("password", actionItem?.password);
    setValue("role", actionItem?.role);
    setValue("branchId", branch);
  }, [actionItem, setValue, setError, branch]);

  return (
    <form onSubmit={handleSubmit(handleEditUser)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-1 gap-x-6"
        size="full"
        heading="Update User Information"
      >
        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <div className=" grid grid-flow-col-dense justify-between gap-2">
            <InputWrapper
              label={ADD_EDIT_USER_FORM.branchId.label[locale]}
              labelFor="branch"
              error={errors?.branchId?.message}
              className="w-full"
            >
              <Select
                defaultValue={actionItem?.branchId?.toString()}
                onValueChange={(value: string) => {
                  setBranch(+value);
                  setError("branchId", { type: "custom", message: "" });
                }}
              >
                <SelectTrigger id="branch">
                  <SelectValue
                    placeholder={
                      ADD_EDIT_USER_FORM.branchId.placeholder[locale]
                    }
                  />
                </SelectTrigger>
                <SelectContent>
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

            {/* ADD NEW BRANCH BUTTON */}
            <InputWrapper label="#" error="" labelFor="add_new_branch">
              <Dialog open={addBranchOpen} onOpenChange={setAddBranchOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="group relative"
                    variant="outline"
                    size="icon"
                  >
                    <LuPlus className="h-4 w-4" />
                    <span className="sr-only">Add New Branch Button</span>
                    <span className="custom-tooltip-left">Add New Branch</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AddBranch setAddBranchOpen={setAddBranchOpen} />
                </DialogContent>
              </Dialog>
            </InputWrapper>
          </div>
        )}
        {/* USER FIRST NAME */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.firstName.label[locale]}
          labelFor="first_name"
          error={errors?.firstName?.message}
        >
          <Input
            defaultValue={actionItem?.firstName}
            {...register("firstName")}
            type="text"
            id="first_name"
            placeholder={ADD_EDIT_USER_FORM.firstName.placeholder[locale]}
          />
        </InputWrapper>

        {/* USER LAST NAME */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.lastName.label[locale]}
          labelFor="last_name"
          error={errors?.lastName?.message}
        >
          <Input
            defaultValue={actionItem?.lastName}
            {...register("lastName")}
            type="text"
            id="last_name"
            placeholder={ADD_EDIT_USER_FORM.lastName.placeholder[locale]}
          />
        </InputWrapper>

        {/* USER EMAIL */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.email.label[locale]}
          labelFor="email"
          error={errors?.email?.message}
        >
          <Input
            defaultValue={actionItem?.email}
            {...register("email")}
            type="email"
            id="email"
            placeholder={ADD_EDIT_USER_FORM.email.placeholder[locale]}
          />
        </InputWrapper>
        {/* USER PHONE */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.phone.label[locale]}
          labelFor="phone"
          error={errors?.phone?.message}
        >
          <Input
            defaultValue={actionItem?.phone}
            {...register("phone")}
            type="number"
            id="phone"
            placeholder={ADD_EDIT_USER_FORM.phone.placeholder[locale]}
          />
        </InputWrapper>

        {/* USER ALTERNATE PHONE */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.alternatePhone.label[locale]}
          labelFor="alternate_phone"
          error={errors?.alternatePhone?.message}
        >
          <Input
            defaultValue={actionItem?.alternatePhone}
            {...register("alternatePhone")}
            type="number"
            id="alternate_phone"
            placeholder={ADD_EDIT_USER_FORM.alternatePhone.placeholder[locale]}
          />
        </InputWrapper>

        {/* USER FAMILY PHONE */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.familyPhone.label[locale]}
          labelFor="family_phone"
          error={errors?.familyPhone?.message}
        >
          <Input
            defaultValue={actionItem?.familyPhone}
            {...register("familyPhone")}
            type="number"
            id="family_phone"
            placeholder={ADD_EDIT_USER_FORM.familyPhone.placeholder[locale]}
          />
        </InputWrapper>
        {/* USER BIRTH DATE */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.dateOfBirth.label[locale]}
          labelFor="birth_date"
          error={errors?.dateOfBirth?.message}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                fromYear={1960}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        </InputWrapper>

        {/* USER PASSWORD */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.password.label[locale]}
          labelFor="password"
          error={errors?.password?.message}
        >
          <div className="relative">
            <Input
              type={visible ? "text" : "password"}
              id="password"
              placeholder="Write your password"
              {...register("password")}
            />

            <button
              type="button"
              className="text-lg absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer whitespace-nowrap rounded-md p-1 hover:bg-accent"
              onClick={() => setVisible(!visible)}
            >
              {visible ? (
                <LucideEye className="h-5 w-5" />
              ) : (
                <LucideEyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </InputWrapper>

        {/* USER PERMANENT ADDRESS */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.permanentAddress.label[locale]}
          labelFor="permanent_address"
          error={errors?.permanentAddress?.message}
        >
          <Input
            defaultValue={actionItem?.permanentAddress}
            {...register("permanentAddress")}
            type="text"
            id="permanent_address"
            placeholder={
              ADD_EDIT_USER_FORM.permanentAddress.placeholder[locale]
            }
          />
        </InputWrapper>

        {/* USER CURRENT ADDRESS */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.currentAddress.label[locale]}
          labelFor="current_address"
          error={errors?.currentAddress?.message}
        >
          <Input
            defaultValue={actionItem?.currentAddress}
            {...register("currentAddress")}
            type="text"
            id="current_address"
            placeholder={ADD_EDIT_USER_FORM.currentAddress.placeholder[locale]}
          />
        </InputWrapper>

        {/* USER BLOOD GROUP */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.bloodGroup.label[locale]}
          labelFor="blood_group"
          error={errors?.bloodGroup?.message}
        >
          <Select
            defaultValue={actionItem?.bloodGroup}
            onValueChange={(value: string) => {
              setValue("bloodGroup", value);
              setError("bloodGroup", { type: "custom", message: "" });
            }}
          >
            <SelectTrigger id="blood_group" className="">
              <SelectValue
                placeholder={ADD_EDIT_USER_FORM.bloodGroup.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {BLOOD_GROUPS?.length > 0 &&
                BLOOD_GROUPS.map(
                  (singleBloodGroup: any, bloodIndex: number) => (
                    <SelectItem key={bloodIndex} value={singleBloodGroup?.key}>
                      {singleBloodGroup?.label}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* USER GENDER */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.gender.label[locale]}
          labelFor="gender"
          error={errors?.gender?.message}
        >
          <Select
            defaultValue={actionItem?.gender}
            onValueChange={(value: string) => {
              setValue("gender", value);
              setError("gender", { type: "custom", message: "" });
            }}
          >
            <SelectTrigger id="gender" className="">
              <SelectValue
                placeholder={ADD_EDIT_USER_FORM.gender.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS?.length > 0 &&
                GENDER_OPTIONS?.map(
                  (singleGenderOption: any, genderIndex: number) => (
                    <SelectItem
                      key={genderIndex}
                      value={singleGenderOption?.key}
                    >
                      {singleGenderOption?.label}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* USER MARITAL STATUS */}

        <InputWrapper
          label={ADD_EDIT_USER_FORM.martialStatus.label[locale]}
          labelFor="marital_status"
          error={errors?.maritialStatus?.message}
        >
          <Select
            defaultValue={actionItem?.maritialStatus}
            onValueChange={(value: string) => {
              setValue("maritialStatus", value);
              setError("maritialStatus", { type: "custom", message: "" });
            }}
          >
            <SelectTrigger id="marital_status" className="">
              <SelectValue
                placeholder={
                  ADD_EDIT_USER_FORM.martialStatus.placeholder[locale]
                }
              />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUS_OPTIONS?.length > 0 &&
                MARITAL_STATUS_OPTIONS?.map(
                  (singleMaritalStatus: any, maritalStatusIndex: number) => (
                    <SelectItem
                      key={maritalStatusIndex}
                      value={singleMaritalStatus?.key}
                    >
                      {singleMaritalStatus?.label}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* USER ROLE */}

        <InputWrapper
          label={ADD_EDIT_USER_FORM.role.label[locale]}
          labelFor="role"
          error={errors?.role?.message}
        >
          <Select
            defaultValue={actionItem?.role}
            onValueChange={(value: string) => {
              setValue("role", value);
              setError("role", { type: "custom", message: "" });
            }}
          >
            <SelectTrigger id="role" className="">
              <SelectValue
                placeholder={ADD_EDIT_USER_FORM.role.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {USER_ROLE_OPTIONS?.length > 0 &&
                USER_ROLE_OPTIONS?.map((singleRole: any, roleIndex: number) => (
                  <SelectItem key={roleIndex} value={singleRole?.key}>
                    {singleRole?.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </InputWrapper>

        {/* DOCUMENT ATTACHMENT */}
        <InputWrapper
          error={errors?.fileAttachment?.message}
          labelFor="file_attachment"
          label={ADD_EDIT_USER_FORM.fileAttachment.label[locale]}
        >
          <div className="relative">
            <Input
              placeholder={
                ADD_EDIT_USER_FORM.fileAttachment.placeholder[locale]
              }
              onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files.length > 0) {
                  const img = event.target.files[0];
                  const newFormData = new FormData();
                  newFormData.append("image", img);
                  // const result = await addThumbnail(newFormData).unwrap();
                  // setValue("image", result?.data);
                }
              }}
              id="file_attachment"
              type="file"
              className="pr-8"
            />
            {addThumbnailSuccess && (
              <span className="duration-300 cursor-pointer transition-all absolute size-5 top-1/2 right-1 -translate-y-1/2  bg-success/80 flex justify-center items-center rounded-full">
                <LuCheck className="size-3 text-white" />
              </span>
            )}
            {addThumbnailLoading && (
              <span className="duration-300 transition-all absolute size-5 top-1/2 right-1 -translate-y-1/2  bg-success/80 flex justify-center items-center rounded-full">
                <LuLoader2 className="size-3 text-white animate-spin" />
              </span>
            )}
          </div>
        </InputWrapper>
        {/* USER THUMBNAIL */}
        <InputWrapper
          error={errors?.avatar?.message}
          labelFor="user_avatar"
          label={ADD_EDIT_USER_FORM.avatar.label[locale]}
        >
          <div className="relative">
            <Input
              placeholder={ADD_EDIT_USER_FORM.avatar.placeholder[locale]}
              onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files.length > 0) {
                  const img = event.target.files[0];
                  const newFormData = new FormData();
                  newFormData.append("image", img);
                  // const result = await addThumbnail(newFormData).unwrap();
                  // setValue("avatar", result?.data);
                }
              }}
              id="user_avatar"
              type="file"
              className="pr-8"
            />
            {addThumbnailSuccess && (
              <span className="duration-300 cursor-pointer transition-all absolute size-5 top-1/2 right-1 -translate-y-1/2  bg-success/80 flex justify-center items-center rounded-full">
                <LuCheck className="size-3 text-white" />
              </span>
            )}
            {addThumbnailLoading && (
              <span className="duration-300 transition-all absolute size-5 top-1/2 right-1 -translate-y-1/2  bg-success/80 flex justify-center items-center rounded-full">
                <LuLoader2 className="size-3 text-white animate-spin" />
              </span>
            )}
          </div>
        </InputWrapper>

        {/* USER FACEBOOK LINK */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.facebook.label[locale]}
          labelFor="facebook"
          error={errors?.facebook?.message}
        >
          <Input
            defaultValue={actionItem?.facebook}
            {...register("facebook")}
            type="facebook"
            id="facebook"
            placeholder={ADD_EDIT_USER_FORM.facebook.placeholder[locale]}
          />
        </InputWrapper>
        {/* USER TWITTER LINK */}
        <InputWrapper
          label={ADD_EDIT_USER_FORM.twitter.label[locale]}
          labelFor="twitter"
          error={errors?.twitter?.message}
        >
          <Input
            defaultValue={actionItem?.twitter}
            {...register("twitter")}
            type="twitter"
            id="twitter"
            placeholder={ADD_EDIT_USER_FORM.twitter.placeholder[locale]}
          />
        </InputWrapper>
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {editUserError &&
            Object?.keys(editUserError)?.length > 0 &&
            "data" in editUserError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add User Error</AlertTitle>
                <AlertDescription>
                  {editUserError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* UPDATE USER BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={loadingEditUser} type="submit">
            {loadingEditUser && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditUser;
