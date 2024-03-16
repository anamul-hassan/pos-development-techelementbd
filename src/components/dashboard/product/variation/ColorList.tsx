import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DataLoader from "@/components/common/loader/DataLoader";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/common/form/InputWrapper";
import { AlertCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/common/loader/ButtonLoader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/common/table/DataTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { LuPlus } from "react-icons/lu";

import AddColor from "./AddColor";
import FormWrapper from "@/components/common/form/FormWrapper";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAndEditVariationColorSchema } from "@/schemas/variation/add_edit_color_variation_schema";
import { ColumnDef } from "@tanstack/react-table";
import InfoWrapper from "@/components/common/InfoWrapper";
import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import {
  useDeleteVariationColorMutation,
  useGetVariationColorQuery,
  useUpdateVariationColorMutation,
} from "@/store/variation/variationColorApi";

interface IUpdateVariationFormData {
  color: string;
}

const ColorList = () => {
  const { toast } = useToast() as any;
  // ADD COLOR DIALOG STATE
  const [addColorOpen, setAddColorOpen] = useState(false);
  // VARIATION COLOR UPDATE STATE
  const [actionItem, setActionItem] = useState<any>();
  // VARIATION LIST STATE
  const [colorList, setColorList] = useState([]);

  const [searchColor, setSearchColor] = useState("");

  // GET VARIATION COLOR, SEARCH, SORTING, PAGE
  const { data: variationColorData, isLoading: isLoadingVariationGet } =
    useGetVariationColorQuery({
      search: searchColor,
    }) as any;

  // DELETE VARIATION COLOR MUTATION
  const [
    deleteVariationColor,
    {
      data: deleted,
      isLoading: isUpdateVariationColorLoading,
      isSuccess: isDeleteVariationColor,
    },
  ] = useDeleteVariationColorMutation({}) as any;

  // DELETE COLOR HANDLER
  const deleteColorHandler = async (id: string) => {
    const result = await deleteVariationColor(id);
    // SET THE UPDATED COLOR LIST
    if (result?.data?.success) {
      setColorList(
        colorList.filter((singleColor: any) => singleColor?.id !== id)
      );
    }
  };

  // VARIATION COLOR UPDATE MUTATION
  const [
    updateVariationColor,
    {
      data: updated,
      isSuccess: isUpdateVariationColor,
      error: updateVariationColorError,
    },
  ] = useUpdateVariationColorMutation({});

  // VARIATION COLOR UPDATE REACT HOOK FORM
  const {
    register,
    reset,
    setValue: colorEditSetValue,
    handleSubmit: handleEditColorSubmit,
    formState: { errors },
  } = useForm<IUpdateVariationFormData>({
    resolver: yupResolver(addAndEditVariationColorSchema),
  });

  // VARIATION COLOR UPDATE HANDLER
  const onEditColorSubmit = handleEditColorSubmit(async (data: any) => {
    await updateVariationColor({ id: actionItem?.id, data });
  });
  // VARIATION COLOR DATA FETCHING TO SHOW IN THE DATA TABLE
  useEffect(() => {
    if (variationColorData?.data?.length > 0) {
      const customizeVariationColor = variationColorData?.data?.map(
        (color: any, colorIndex: number) => {
          return {
            index: colorIndex + 1,
            id: color?.id,
            color: capitalizeEveryWord(color?.color),
          };
        }
      );
      setColorList(customizeVariationColor);
    }
  }, [variationColorData?.data]);
  // DELETE AND UPDATE VARIATION COLOR MESSAGE
  useEffect(() => {
    // DELETE VARIATION COLOR,
    if (isDeleteVariationColor) {
      toast({
        title: "Color Delete Message",
        description: deleted?.message,
      });
    }

    // UPDATE VARIATION COLOR,
    if (isUpdateVariationColor) {
      toast({
        title: "Color Update Message",
        description: updated?.message,
      });
      reset();
    }
  }, [
    deleted?.message,
    isDeleteVariationColor,
    isUpdateVariationColor,
    reset,
    toast,
    updated?.message,
  ]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "index",
      header: "Index",
    },
    {
      accessorKey: "color",
      header: "Color",
    },

    {
      header: "Action",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const color = row.original as any;

        return (
          // DROPDOWN FOR ACTION MENU
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => {
                  setActionItem(color);
                  colorEditSetValue("color", color?.color);
                }}
                variant="ghost"
                className="h-8 w-8 p-0 pointer-events-auto"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Color Actions</DropdownMenuLabel>
              {/* VARIATION COLOR UPDATE BUTTON */}
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
                  <form onSubmit={onEditColorSubmit}>
                    <FormWrapper size="full" heading="Update Variation Color">
                      {/* COLOR NAME */}
                      <InputWrapper
                        label="Write Variation Color"
                        labelFor="new_variation_color"
                        error={errors?.color?.message}
                      >
                        <Input
                          {...register("color")}
                          type="text"
                          id="new_variation_color"
                          placeholder="Write variation color"
                          defaultValue={actionItem?.color}
                        />
                      </InputWrapper>
                      <div className="flex justify-end w-full my-4">
                        <Button
                          disabled={isUpdateVariationColorLoading}
                          type="submit"
                        >
                          {isUpdateVariationColorLoading && <ButtonLoader />}
                          Edit Now
                        </Button>
                      </div>

                      {/* ERROR MESSAGE */}
                      <div className="my-2">
                        {updateVariationColorError &&
                          "data" in updateVariationColorError && (
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

              {/* VARIATION COLOR DELETE BUTTON */}

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
                      This color will be delete permanently. Are you sure you
                      want to delete the color?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteColorHandler(color?.id)}
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

  // VARIATION GET LOADING
  if (isLoadingVariationGet) {
    return <DataLoader />;
  }

  return (
    <section className="my-6">
      {/* SEARCH VARIATION FIELD */}
      <div className="flex justify-end">
        {/* SEARCH COLOR FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write Color Name"
            labelFor="search_color"
            error=""
          >
            <Input
              id="search_color"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchColor(e.target.value)
              }
              className="w-full md:w-[250px]"
              placeholder="Write variation color for searching"
            />
          </InputWrapper>
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addColorOpen} onOpenChange={setAddColorOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Color Button</span>
                  <span className="custom-tooltip-left">Add New Color</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                {/* ADD NEW VARIATION FORM CONTAINER */}
                <AddColor setAddColorOpen={setAddColorOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      {/*  VARIATION COLOR TABLE CONTAINER */}
      <InfoWrapper className="my-2" heading="Color Information">
        <DataTable columns={columns} data={colorList} />
      </InfoWrapper>
    </section>
  );
};

export default ColorList;
