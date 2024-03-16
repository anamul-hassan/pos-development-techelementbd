import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { addEditExpenseSchema } from "@/schemas/expense/expense_schema";
import { useGetAccountsQuery } from "@/store/account/accountApi";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useUpdateExpenseMutation } from "@/store/expense/expenseApi";
import { useGetAllExpenseCategoryQuery } from "@/store/expense_category/expenseCategoryApi";
import { useGetExpenseSubCategoriesQuery } from "@/store/expense_sub_category/expense_sub_category";
import { useAddThumbnailMutation } from "@/store/file/fileApi";
import { ADD_EDIT_EXPENSE_FORM_DATA } from "@/utils/constants/expense/add_edit_expense_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuLoader2, LuPlus, LuTrash } from "react-icons/lu";

interface IEditExpenseProps {
  actionItem: any;
}

const EditExpense: FC<IEditExpenseProps> = ({ actionItem }) => {
  // DATE STATE
  const [date, setDate] = useState<Date>();
  // LOCALE FON LANGUAGE
  const locale = "en";
  // GET THE BRANCH BY THIS FUNCTION
  const { branchId } = shareBranchAndUserInfo();
  // TOAST STATE
  const { toast } = useToast();
  // BRANCH STATE
  const [branch, setBranch] = useState<number>(branchId);
  // UPDATE STATE FOR SELECTOR
  const [update, setUpdate] = useState(false);

  // STATE FOR ADDING NEW PAYMENT OPTION
  const [paymentMethodTable, setPaymentMethodTable] = useState<any>([
    {
      index: 0,
      accountId: 0,
      paymentAmount: 0,
    },
  ]);
  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);

  // ADD EXPENSE MUTATION
  const [
    updateExpense,
    { isLoading: editExpenseLoading, error: editExpenseError },
  ] = useUpdateExpenseMutation({}) as any;

  // GET EXPENSE CATEGORY QUERY
  const { data: expenseCategories, isLoading: expenseCategoryLoading } =
    useGetAllExpenseCategoryQuery({}) as any;

  // GET EXPENSE SUB-CATEGORY QUERY
  const { data: getSubCategories, isLoading: subCategoryLoading } =
    useGetExpenseSubCategoriesQuery({}) as any;

  // GET ALL THE BANK ACCOUNT QUERY
  const { data: accountsData, isLoading: accountLoading } = useGetAccountsQuery(
    "All"
  ) as any;

  // ADD THUMBNAIL MUTATION
  const [
    // addThumbnail,
    { isLoading: addThumbnailLoading, isSuccess: addThumbnailSuccess },
  ] = useAddThumbnailMutation({}) as any;

  // REACT HOOK FORM TO ADD EXPENSE
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    watch,
  } = useForm({ resolver: yupResolver(addEditExpenseSchema) });

  const handleUpdateExpense = async (data: any) => {
    const updateData = removeEmptyStringOrZeroProperties(data, [
      "date",
      "image",
    ]);
    const result = await updateExpense({
      id: actionItem?.id,
      data: updateData,
    });
    if (result?.data?.success) {
      toast({
        title: "Update Expense Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    if (branch) {
      setValue("branchId", branch);
    }
    if (date) {
      setValue("date", date);
    }
    // SET THE PAYMENT DATA ON THE FORM
    setValue(
      "payments",
      paymentMethodTable.map((account: any) => {
        return {
          accountId: account.accountId,
          paymentAmount: account.paymentAmount ? account.paymentAmount : 0,
        };
      })
    );
  }, [branch, setValue, date, paymentMethodTable]);

  // REMOVE PAYMENT TABLE HANDLER
  const removePaymentTableHandler = (index: number) => {
    // FILTER OUT THE TABLE WITH THE SPECIFIC INDEX
    const updatedPaymentMethodTable = paymentMethodTable.filter(
      (table: any) => table.index !== index
    );

    // UPDATE THE INDEX OF THE REMAINING ITEMS
    updatedPaymentMethodTable.forEach((table: any, idx: number) => {
      table.index = idx;
    });
    // SET THE UPDATED TABLE IN THE STATE
    setPaymentMethodTable(updatedPaymentMethodTable);
  };
  // ADD NEW PAYMENT TABLE HANDLER
  const addPaymentTableHandler = () => {
    // GET THE HIGHEST INDEX NUMBER
    const maxIndex = Math.max(
      ...paymentMethodTable.map((account: any) => +account.index)
    );
    // CREATE A NEW OBJECT WITH THE REQUIRE PROPERTIES
    const newItem = {
      index: +maxIndex + 1,
      accountId: 0,
      paymentAmount: "",
    };
    // UPDATE THE DATA ON THE STATE
    setPaymentMethodTable([...paymentMethodTable, newItem]);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateExpense)}>
      <FormWrapper size="full" heading="Add New Expense">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 md:gap-x-6">
          {/* EXPENSE NAME */}
          <InputWrapper
            label={ADD_EDIT_EXPENSE_FORM_DATA.name.label[locale]}
            labelFor="expense_name"
            error={errors?.name?.message}
          >
            <Input
              {...register("name")}
              type="text"
              id="expense_name"
              placeholder={ADD_EDIT_EXPENSE_FORM_DATA.name.placeholder[locale]}
            />
          </InputWrapper>

          {/* EXPENSE AMOUNT */}
          <InputWrapper
            label={ADD_EDIT_EXPENSE_FORM_DATA.totalAmount.label[locale]}
            labelFor="expense_amount"
            error={errors?.name?.message}
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue("totalAmount", +e.target.value)
              }
              type="number"
              id="expense_amount"
              placeholder={
                ADD_EDIT_EXPENSE_FORM_DATA.totalAmount.placeholder[locale]
              }
            />
          </InputWrapper>
          {/* EXPENSE DATE  */}
          <InputWrapper
            label={ADD_EDIT_EXPENSE_FORM_DATA.date.label[locale]}
            labelFor="expense_date"
            error={errors?.date?.message}
          >
            <Popover>
              <PopoverTrigger id="expense_date" asChild>
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
          {/* DOCUMENT ATTACHMENT */}
          <InputWrapper
            error={errors?.image?.message}
            labelFor="image"
            label={ADD_EDIT_EXPENSE_FORM_DATA.image.label[locale]}
          >
            <div className="relative">
              <Input
                placeholder={
                  ADD_EDIT_EXPENSE_FORM_DATA.image.placeholder[locale]
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
                id="attachment"
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

          {/* EXPENSE CATEGORY */}
          <InputWrapper
            error={errors?.expenseCategoryId?.message}
            labelFor="expense_category"
            label={ADD_EDIT_EXPENSE_FORM_DATA.expenseCategoryId.label[locale]}
          >
            <Select
              defaultValue={watch("expenseCategoryId")?.toString()}
              onValueChange={(value: string) => {
                setValue("expenseCategoryId", +value);
                setError("expenseCategoryId", { type: "custom", message: "" });
              }}
            >
              <SelectTrigger id="expense_category">
                <SelectValue
                  placeholder={
                    ADD_EDIT_EXPENSE_FORM_DATA.expenseCategoryId.placeholder[
                      locale
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {getSubCategories?.data?.length > 0 &&
                  getSubCategories?.data?.map((singleSubCategory: any) => (
                    <SelectItem
                      key={singleSubCategory?.id}
                      value={singleSubCategory?.id?.toString()}
                    >
                      {capitalizeEveryWord(singleSubCategory?.name)}
                    </SelectItem>
                  ))}
                {!getSubCategories?.data?.length && subCategoryLoading && (
                  <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                    <ButtonLoader />
                  </div>
                )}
              </SelectContent>
            </Select>
          </InputWrapper>
          {/* EXPENSE SUB-CATEGORY */}
          <InputWrapper
            error={errors?.expenseSubcategoryId?.message}
            labelFor="expense_sub_category"
            label={
              ADD_EDIT_EXPENSE_FORM_DATA.expenseSubcategoryId.label[locale]
            }
          >
            <Select
              defaultValue={watch("expenseSubcategoryId")?.toString()}
              onValueChange={(value: string) => {
                setValue("expenseSubcategoryId", +value);
                setError("expenseSubcategoryId", {
                  type: "custom",
                  message: "",
                });
              }}
            >
              <SelectTrigger id="expense_sub_category">
                <SelectValue
                  placeholder={
                    ADD_EDIT_EXPENSE_FORM_DATA.expenseSubcategoryId.placeholder[
                      locale
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories?.data?.length > 0 &&
                  expenseCategories?.data?.map((singleCategory: any) => (
                    <SelectItem
                      key={singleCategory?.id}
                      value={singleCategory?.id?.toString()}
                    >
                      {capitalizeEveryWord(singleCategory?.name)}
                    </SelectItem>
                  ))}
                {!expenseCategories?.data?.length && expenseCategoryLoading && (
                  <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                    <ButtonLoader />
                  </div>
                )}
              </SelectContent>
            </Select>
          </InputWrapper>
        </div>
        {/* PAYMENT METHOD */}
        <div className="max-h-[220px] overflow-y-auto scroll-hidden pb-1">
          {paymentMethodTable?.map(
            (singleAccount: any, accountIndex: number) => (
              <ul
                key={accountIndex}
                className="grid grid-flow-row md:grid-flow-col px-1 gap-y-1 gap-x-4 md:gap-x-6"
              >
                <li>
                  {accountIndex === 0 ? (
                    <InputWrapper label="#" error="" labelFor="add_new_method">
                      {/* ADD PAYMENT METHOD TABLE */}
                      <Button
                        type="button"
                        onClick={() => addPaymentTableHandler()}
                        variant="outline"
                        size="icon"
                        className="group relative"
                        disabled={
                          watch("payments")?.length ===
                          accountsData?.data?.length
                        }
                      >
                        <LuPlus className="h-4 w-4" />

                        <span className="sr-only">
                          Add Another Pay Method Button
                        </span>
                        <span className="custom-tooltip-right">
                          Add Another Payment Method
                        </span>
                      </Button>
                    </InputWrapper>
                  ) : (
                    <InputWrapper label="#" error="" labelFor="#">
                      {/* REMOVE PAYMENT METHOD TABLE */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            className="group relative"
                            variant="destructive"
                            size="icon"
                          >
                            <LuTrash className="h-4 w-4" />
                            {/* TOOLTIP TEXT */}
                            <span className="custom-tooltip-right">
                              Remove Payment Method
                            </span>
                            <span className="sr-only">
                              Remove Pay Method Button
                            </span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Payment Method Removal Confirmation
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this payment
                              method? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                removePaymentTableHandler(accountIndex)
                              }
                            >
                              Confirm
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </InputWrapper>
                  )}
                </li>
                <li className="w-full">
                  <InputWrapper
                    labelFor={`paying_method${accountIndex}`}
                    label={ADD_EDIT_EXPENSE_FORM_DATA.accountId?.label[locale]}
                    error={
                      errors?.payments?.[
                        accountIndex
                      ]?.accountId?.message?.toString() ?? ""
                    }
                  >
                    <Select
                      onOpenChange={(open: boolean) => setUpdate(open)}
                      onValueChange={(value: any) => {
                        // THIS CONDITION PREVENT THE UPDATE DATA AUTOMATICALLY
                        if (update) {
                          const updatedTable = paymentMethodTable.map(
                            (item: any) =>
                              item.index === accountIndex
                                ? { ...item, accountId: +value }
                                : item
                          );
                          setPaymentMethodTable(updatedTable);
                        }
                      }}
                      value={singleAccount.accountId || ""}
                    >
                      <SelectTrigger
                        id={`paying_method${accountIndex}`}
                        className={`w-full focus:ring-0 `}
                      >
                        <SelectValue
                          placeholder={
                            ADD_EDIT_EXPENSE_FORM_DATA.accountId?.placeholder[
                              locale
                            ]
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {!accountsData?.data?.length && accountLoading && (
                          <div className="w-full h-24 flex items-center justify-center">
                            {accountLoading && <ButtonLoader />}
                          </div>
                        )}
                        {accountLoading ||
                          (accountsData?.data &&
                            accountsData?.data?.length > 0 &&
                            accountsData?.data.map((singleAccount: any) => (
                              <SelectItem
                                disabled={
                                  (watch("payments")?.length ?? 0) > 0 &&
                                  watch("payments")?.some(
                                    (accountItem2: any) =>
                                      accountItem2?.accountId ===
                                      singleAccount?.id
                                  )
                                }
                                className="cursor-pointer"
                                key={singleAccount?.id}
                                value={singleAccount?.id}
                              >
                                {singleAccount?.accountName}
                              </SelectItem>
                            )))}
                      </SelectContent>
                    </Select>
                  </InputWrapper>
                </li>
                <li className="w-full">
                  <InputWrapper
                    label={
                      ADD_EDIT_EXPENSE_FORM_DATA.paymentAmount.label[locale]
                    }
                    error={
                      errors?.payments?.[
                        accountIndex
                      ]?.paymentAmount?.message?.toString() ?? ""
                    }
                    labelFor={`enter_amount${accountIndex}`}
                  >
                    {/* ENTER AMOUNT FILED */}
                    <Input
                      className="min-w-[150px]"
                      type="number"
                      value={singleAccount.paymentAmount || ""}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const updatedTable = paymentMethodTable.map(
                          (item: any) =>
                            item.index === accountIndex
                              ? {
                                  ...item,
                                  paymentAmount: +e.target.value,
                                }
                              : item
                        );
                        setPaymentMethodTable(updatedTable);
                      }}
                      onWheel={(event) => event.currentTarget.blur()}
                      id={`enter_amount${accountIndex}`}
                      placeholder={
                        ADD_EDIT_EXPENSE_FORM_DATA.paymentAmount.placeholder[
                          locale
                        ]
                      }
                    />
                  </InputWrapper>
                </li>
              </ul>
            )
          )}
        </div>

        {/* BRANCH LIST */}
        {actionManager(["admin"]) && (
          <InputWrapper
            label={ADD_EDIT_EXPENSE_FORM_DATA.branchId.label[locale]}
            labelFor="branch"
            error={errors?.branchId?.message}
          >
            <Select
              value={branch?.toString()}
              onValueChange={(value: string) => setBranch(+value)}
            >
              <SelectTrigger id="branch">
                <SelectValue
                  placeholder={
                    ADD_EDIT_EXPENSE_FORM_DATA.branchId.placeholder[locale]
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
        )}
      </FormWrapper>

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {editExpenseError &&
            Object?.keys(editExpenseError)?.length > 0 &&
            "data" in editExpenseError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Update Expense Error</AlertTitle>
                <AlertDescription>
                  {editExpenseError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* UPDATE EXPENSE BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={editExpenseLoading} type="submit">
            {editExpenseLoading && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};
export default EditExpense;
