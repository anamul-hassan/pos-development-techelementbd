import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/common/form/InputWrapper";
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
import { AlertCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/common/loader/ButtonLoader";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/table/DataTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { LuPlus } from "react-icons/lu";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAndEditVariationSizeSchema } from "@/schemas/variation/add_edit_size_variation_schema";
import FormWrapper from "@/components/common/form/FormWrapper";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InfoWrapper from "@/components/common/InfoWrapper";
import AddSize from "./AddSize";
import {
  useDeleteVariationSizeMutation,
  useGetVariationSizeQuery,
  useUpdateVariationSizeMutation,
} from "@/store/variation/variationSizeApi";

interface IUpdateVariationFormData {
  size: string;
}

const SizeList = () => {
  const { toast } = useToast() as any;
  // ADD COLOR DIALOG STATE
  const [addSizeOpen, setAddSizeOpen] = useState(false);
  const [searchSize, setSearchSize] = useState("");

  // VARIATION SIZE UPDATE STATE
  const [actionItem, setActionItem] = useState<any>();

  // VARIATION LIST STATE
  const [sizeList, setSizeList] = useState([]);

  // GET VARIATION SIZE, SEARCH, SORTING, PAGE
  const { data: sizeData, isLoading: sizeLoading } = useGetVariationSizeQuery({
    search: searchSize,
  }) as any;

  // VARIATION SIZE DATA FETCHING TO SHOW IN THE DATA TABLE
  useEffect(() => {
    if (sizeData?.data?.length > 0) {
      const customizeSize = sizeData?.data?.map((size: any, index: number) => {
        return {
          index: index + 1,
          id: size?.id,
          size: size?.size,
        };
      });
      setSizeList(customizeSize);
    }
  }, [sizeData?.data]);

  // DELETE VARIATION SIZE
  const [
    deleteVariationSize,
    { data: deleted, isSuccess: isDeleteVariationSize },
  ] = useDeleteVariationSizeMutation({}) as any;

  // VARIATION size UPDATE MUTATION
  const [
    updateVariationSize,
    {
      data: updated,
      isSuccess: isUpdateVariationSize,
      isLoading: isUpdateVariationSizeLoading,
      error: updateVariationSizeError,
    },
  ] = useUpdateVariationSizeMutation();

  // VARIATION SIZE UPDATE REACT HOOK FORM
  const {
    register,
    reset,
    handleSubmit: sizeEditHandleSubmit,
    setValue: sizeEditSetValue,
    formState: { errors },
  } = useForm<IUpdateVariationFormData>({
    resolver: yupResolver(addAndEditVariationSizeSchema),
  });

  // VARIATION SIZE UPDATE HANDLER
  const onEditSizeSubmit = sizeEditHandleSubmit(async (data: any) => {
    await updateVariationSize({ id: actionItem?.id, data });
  });

  // DELETE COLOR HANDLER
  const deleteSizeHandler = async (id: string) => {
    const result = await deleteVariationSize(id);
    // SET THE UPDATED COLOR LIST
    if (result?.data?.success) {
      setSizeList(sizeList.filter((singleSize: any) => singleSize?.id !== id));
    }
  };

  // VARIATION DELETE UPDATE TOAST
  useEffect(() => {
    // DELETE VARIATION,
    if (isDeleteVariationSize) {
      toast({
        title: "Size Delete Message",
        description: deleted?.message,
      });
    }

    // UPDATE VARIATION,
    if (isUpdateVariationSize) {
      toast({
        title: "Size Update Message",
        description: updated?.message,
      });
      reset();
    }
  }, [
    isDeleteVariationSize,
    isUpdateVariationSize,
    reset,
    toast,
    updated?.message,
    deleted?.message,
  ]);

  // VARIATION SIZE TABLE
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "index",
      header: "Index",
    },
    {
      accessorKey: "size",
      header: "Size",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const size = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => {
                  setActionItem(size);
                  sizeEditSetValue("size", size?.size);
                }}
                variant="ghost"
                className="h-8 w-8 p-0 pointer-events-auto"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Size Actions</DropdownMenuLabel>

              {/* VARIATION SIZE UPDATE BUTTON */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={onEditSizeSubmit}>
                    <FormWrapper size="full" heading="Update Variation Size">
                      {/* SIZE NAME */}
                      <InputWrapper
                        label="Write Variation Size"
                        labelFor="new_variation_size"
                        error={errors?.size?.message}
                      >
                        <Input
                          {...register("size")}
                          type="text"
                          id="new_variation_size"
                          placeholder="Write variation size"
                          defaultValue={actionItem?.size}
                        />
                      </InputWrapper>
                      <div className="flex justify-end w-full my-4">
                        <Button
                          disabled={isUpdateVariationSizeLoading}
                          type="submit"
                        >
                          {isUpdateVariationSizeLoading && <ButtonLoader />}
                          Edit Now
                        </Button>
                      </div>

                      {/* ERROR MESSAGE */}
                      <div className="my-2">
                        {updateVariationSizeError &&
                          "data" in updateVariationSizeError && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Add Variation Error</AlertTitle>
                              <AlertDescription>
                                "Something went wrong! try again"
                              </AlertDescription>
                            </Alert>
                          )}
                      </div>
                    </FormWrapper>
                  </form>
                </DialogContent>
              </Dialog>

              {/* VARIATION SIZE DELETE BUTTON */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This size will be delete permanently. Are you sure you
                      want to delete the size?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteSizeHandler(size?.id)}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  // VARIATION SIZE GET LOADING
  if (sizeLoading) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* SEARCH VARIATION FIELD */}
      <div className="flex justify-end items-end w-full">
        {/* SEARCH BRAND FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Variation Size"
            labelFor="search_size"
            error=""
          >
            <Input
              className="w-full md:w-[250px]"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchSize(e.target.value)
              }
              placeholder="Write variation size for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addSizeOpen} onOpenChange={setAddSizeOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Size Button</span>
                  <span className="custom-tooltip-left">Add New Size</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW VARIATION FORM CONTAINER */}
                <AddSize setAddSizeOpen={setAddSizeOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>

      {/*  VARIATION SIZE TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Size Information">
        <DataTable columns={columns} data={sizeList} />
      </InfoWrapper>
    </section>
  );
};

export default SizeList;
