import FormWrapper from "@/components/common/form/FormWrapper";
import InputWrapper from "@/components/common/form/InputWrapper";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { addAndEditProductSchema } from "@/schemas/product/product_schema";
import { useGetBranchesQuery } from "@/store/branch/branchApi";
import { useGetBrandsQuery } from "@/store/brand/brandApi";
import { useAddThumbnailMutation } from "@/store/file/fileApi";
import { useUpdateProductMutation } from "@/store/product/productApi";
import { useGetProductCategoriesQuery } from "@/store/product_category/productCategoryApi";
import { useGetProductSubCategoriesQuery } from "@/store/product_sub_category/productSubCategoryApi";
import { useGetUnitsQuery } from "@/store/unit/unitApi";
import { ADD_EDIT_PRODUCT_FORM } from "@/utils/constants/product/add_edit_product_form";
import { actionManager } from "@/utils/helpers/actionManager";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import { removeEmptyStringOrZeroProperties } from "@/utils/helpers/removeEmptyStringProperties";

import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertCircle } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuCheck, LuLoader2 } from "react-icons/lu";

interface IEditProductProps {
  // setEditProductOpen: (editProductOpen: boolean) => void;
  actionItem: any;
}

const EditProduct: FC<IEditProductProps> = ({
  // setEditProductOpen,
  actionItem,
}) => {
  const locale = "en";
  const { branchId } = shareBranchAndUserInfo();
  const { toast } = useToast();
  const [branch, setBranch] = useState<number>(
    branchId || actionItem?.branchId
  );

  // GET ALL BRANDS QUERY
  const { data: brandList, isLoading: brandLoading } = useGetBrandsQuery(
    undefined
  ) as any;
  // GET ALL CATEGORIES QUERY
  const { data: categoryList, isLoading: categoryLoading } =
    useGetProductCategoriesQuery({
      page: 1,
      size: 10000000000,
    }) as any;
  // GET ALL SUB CATEGORY QUERY
  const { data: subCategoryList, isLoading: subCategoryLoading } =
    useGetProductSubCategoriesQuery({
      page: 1,
      size: 10000000000,
    }) as any;
  // UNIT LIST QUERY
  const { data: unitList, isLoading: unitLoading } = useGetUnitsQuery(
    undefined
  ) as any;
  // BRANCH LIST QUERY
  const { data: branchList, isLoading: branchLoading } =
    useGetBranchesQuery(undefined);
  // ADD PRODUCT MUTATION
  const [
    updateProduct,
    { isLoading: loadingEditProduct, error: editProductError },
  ] = useUpdateProductMutation({}) as any;

  // ADD THUMBNAIL MUTATION
  const [
    // addThumbnail,
    { isLoading: addThumbnailLoading, isSuccess: addThumbnailSuccess },
  ] = useAddThumbnailMutation({}) as any;

  // REACT HOOK FORM TO ADD PRODUCT
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(addAndEditProductSchema) });

  const handleEditProduct = async (data: any) => {
    // ADD THUMBNAIL DATA TO THE PRODUCT DATA
    const updateData = removeEmptyStringOrZeroProperties(data, ["image"]);

    const result = await updateProduct({
      id: actionItem?.id,
      data: updateData,
    });
    if (result?.data?.data && result?.data?.success === true) {
      toast({
        title: "Update Product Message",
        description: result?.data?.message,
      });
      reset();
    }
  };

  useEffect(() => {
    setValue("image", actionItem?.image || "");
    setValue("categoryId", actionItem?.categoryId);
    setValue("subCategoryId", actionItem?.subCategoryId);
    setValue("productName", actionItem?.productName);
    setValue("brandId", actionItem?.brandId);
    setValue("unitsId", actionItem?.unitsId);
    if (branch) {
      setValue("branchId", branch);
    }
  }, [actionItem, setValue, branch]);

  return (
    <form onSubmit={handleSubmit(handleEditProduct)}>
      <FormWrapper
        className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 md:gap-x-6"
        size="full"
        heading="Update Product Information"
      >
        {/* PRODUCT NAME */}
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.name.label[locale]}
          labelFor="product_name"
          error={errors?.productName?.message}
        >
          <Input
            defaultValue={actionItem?.productName}
            {...register("productName")}
            type="text"
            id="product_name"
            placeholder={ADD_EDIT_PRODUCT_FORM.name.placeholder[locale]}
          />
        </InputWrapper>
        {/* PRODUCT THUMBNAIL */}
        <InputWrapper
          className="overflow-hidden"
          error=""
          labelFor="product_thumbnail"
          label={ADD_EDIT_PRODUCT_FORM.thumbnail.label[locale]}
        >
          <div className="relative">
            <Input
              placeholder={ADD_EDIT_PRODUCT_FORM.thumbnail.placeholder[locale]}
              onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files && event.target.files.length > 0) {
                  const img = event.target.files[0];
                  const newFormData = new FormData();
                  newFormData.append("image", img);
                  // const result = await addThumbnail(newFormData).unwrap();
                  // setValue("image", result?.data);
                }
              }}
              id="product_thumbnail"
              type="file"
              className="pr-8"
            />
            {addThumbnailSuccess && (
              <span className="duration-300 transition-all absolute size-5 top-1/2 right-1 -translate-y-1/2  bg-success/80 flex justify-center items-center rounded-full cursor-pointer">
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
        {/* PRODUCT CATEGORY */}
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.category.label[locale]}
          labelFor="product_category"
          error={errors?.categoryId?.message}
        >
          <Select
            value={
              watch("categoryId")?.toString() ||
              actionItem?.categoryId?.toString()
            }
            onValueChange={(value: string) => setValue("categoryId", +value)}
          >
            <SelectTrigger id="product_category" className="">
              <SelectValue
                placeholder={ADD_EDIT_PRODUCT_FORM.category.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              {categoryList?.data?.length > 0 &&
                categoryList?.data?.map((singleCategory: any) => (
                  <SelectItem
                    key={singleCategory?.id}
                    value={singleCategory?.id.toString()}
                  >
                    {capitalizeEveryWord(singleCategory?.categoryName)}
                  </SelectItem>
                ))}
              {!categoryList?.data?.length && categoryLoading && (
                <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                  <ButtonLoader />
                </div>
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* PRODUCT SUB CATEGORY */}
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.sub_category.label[locale]}
          labelFor="product_sub_category"
          error={errors?.subCategoryId?.message}
        >
          <Select
            value={
              watch("subCategoryId")?.toString() ||
              actionItem?.subCategoryId?.toString()
            }
            onValueChange={(value: string) => setValue("subCategoryId", +value)}
          >
            <SelectTrigger id="product_sub_category">
              <SelectValue
                placeholder={
                  ADD_EDIT_PRODUCT_FORM.sub_category.placeholder[locale]
                }
              />
            </SelectTrigger>
            <SelectContent>
              {subCategoryList?.data?.length > 0 &&
                subCategoryList?.data?.map((singleSubCategory: any) => (
                  <SelectItem
                    key={singleSubCategory?.id}
                    value={singleSubCategory?.id?.toString()}
                  >
                    {capitalizeEveryWord(singleSubCategory?.subCategoryName)}
                  </SelectItem>
                ))}
              {!subCategoryList?.data?.length && subCategoryLoading && (
                <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                  <ButtonLoader />
                </div>
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* PRODUCT BRAND */}
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.brand.label[locale]}
          labelFor="product_brand"
          error={errors?.brandId?.message}
        >
          <Select
            value={
              watch("brandId")?.toString() || actionItem?.brandId?.toString()
            }
            onValueChange={(value: string) => setValue("brandId", +value)}
          >
            <SelectTrigger id="product_brand">
              <SelectValue
                placeholder={ADD_EDIT_PRODUCT_FORM.brand.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              {brandList?.data?.length > 0 &&
                brandList?.data?.map((singleBrand: any) => (
                  <SelectItem
                    key={singleBrand?.id}
                    value={singleBrand?.id?.toString()}
                  >
                    {capitalizeEveryWord(singleBrand?.brand)}
                  </SelectItem>
                ))}
              {!brandList?.data?.length && brandLoading && (
                <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                  <ButtonLoader />
                </div>
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
        {/* PRODUCT UNIT */}
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.unit.label[locale]}
          labelFor="product_unit"
          error={errors?.unitsId?.message}
        >
          <Select
            value={
              watch("unitsId")?.toString() || actionItem?.unitsId?.toString()
            }
            onValueChange={(value: string) => setValue("unitsId", +value)}
          >
            <SelectTrigger id="product_unit" className="">
              <SelectValue
                placeholder={ADD_EDIT_PRODUCT_FORM.unit.placeholder[locale]}
              />
            </SelectTrigger>
            <SelectContent>
              {unitList?.data?.length > 0 &&
                unitList?.data?.map((singleUnit: any) => (
                  <SelectItem
                    key={singleUnit?.id}
                    value={singleUnit?.id?.toString()}
                  >
                    {capitalizeEveryWord(singleUnit?.name)}
                  </SelectItem>
                ))}
              {!unitList?.data?.length && unitLoading && (
                <div className="flex justify-center w-full h-8 items-center bg-accent rounded-md">
                  <ButtonLoader />
                </div>
              )}
            </SelectContent>
          </Select>
        </InputWrapper>
      </FormWrapper>

      {/* BRANCH LIST */}
      {actionManager(["admin"]) && (
        <InputWrapper
          label={ADD_EDIT_PRODUCT_FORM.branch.label[locale]}
          labelFor="branch"
          error={errors?.branchId?.message}
        >
          <Select
            value={branch?.toString()}
            onValueChange={(value: string) => setBranch(+value)}
          >
            <SelectTrigger id="branch">
              <SelectValue
                placeholder={ADD_EDIT_PRODUCT_FORM.branch.placeholder[locale]}
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

      {/* ERROR MESSAGE */}
      <div className="flex justify-between items-center my-2 w-full">
        <div className="flex justify-start w-full md:max-w-[300px]">
          {editProductError &&
            Object?.keys(editProductError)?.length > 0 &&
            "data" in editProductError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Add Product Error</AlertTitle>
                <AlertDescription>
                  {editProductError?.data?.message ||
                    "Something went wrong! try again"}
                </AlertDescription>
              </Alert>
            )}
        </div>
        {/* ADD PRODUCT BUTTON */}
        <div className="flex justify-end w-1/2">
          <Button disabled={loadingEditProduct} type="submit">
            {loadingEditProduct && <ButtonLoader />}
            Update Now
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProduct;
