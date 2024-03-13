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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataLoader from "@/components/common/loader/DataLoader";
import { ColumnDef } from "@tanstack/react-table";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useSearchProductQuery,
} from "@/store/product/productApi";
import InputWrapper from "@/components/common/form/InputWrapper";
import { ChangeEvent, useEffect, useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuPlus } from "react-icons/lu";
import AddProduct from "@/components/dashboard/product/AddProduct";
import InfoWrapper from "@/components/common/InfoWrapper";

import { capitalizeEveryWord } from "@/utils/helpers/capitalizeEveryWord";
import EditProduct from "@/components/dashboard/product/EditProduct";
import PhotoViewer from "@/components/common/photo/PhotoViewer";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import ProductDetails from "@/components/dashboard/product/ProductDetails";
import { useToast } from "@/components/ui/use-toast";

const ProductList = () => {
  // DIALOG STATE
  const [addProductOpen, setAddProductOpen] = useState(false);
  const { toast } = useToast();
  // PAGINATION STATE
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    },
  });

  // PRODUCT LIST STATE
  const [productList, setProductList] = useState([]);
  // ACTION STATE
  const [actionItem, setActionItem] = useState<any>();

  const [deleteDone, setDeleteDone] = useState(false);

  // PRODUCT SEARCH INPUT STATE
  const [productSearch, setProductSearch] = useState("");
  //  GET PRODUCTS QUERY
  const { data: productsData, isLoading: loadingProducts } =
    useGetProductsQuery({
      page: pagination?.page,
      size: pagination?.size,
    }) as any;

  // PRODUCT SEARCH QUERY
  const { data: productsBySearch } = useSearchProductQuery(
    productSearch
  ) as any;

  // PRODUCT DELETE MUTATION
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation({}) as any;

  // PRODUCT TABLE DATA
  useEffect(() => {
    if (!productSearch?.length && productsData?.data?.length > 0) {
      const products = productsData?.data?.map((singleProduct: any) => {
        return {
          ...singleProduct,
          productName: capitalizeEveryWord(singleProduct?.productName),
          category: {
            ...singleProduct?.category,
            categoryName: capitalizeEveryWord(
              singleProduct?.category?.categoryName
            ),
          },
          subCategory: {
            ...singleProduct?.subCategory,
            subCategoryName: capitalizeEveryWord(
              singleProduct?.subCategory?.subCategoryName
            ),
          },
          unit: {
            ...singleProduct?.unit,
            name: capitalizeEveryWord(singleProduct?.unit?.name),
          },
        };
      });
      setProductList(products);
      setPagination((previousData) => ({
        ...previousData,
        meta: productsData?.meta,
      }));
    }
    if (productSearch?.length && productsBySearch?.data?.length > 0) {
      const products = productsBySearch?.data?.map((singleProduct: any) => {
        return {
          ...singleProduct,
          productName: capitalizeEveryWord(singleProduct?.productName),
          category: {
            ...singleProduct?.category,
            categoryName: capitalizeEveryWord(
              singleProduct?.category?.categoryName
            ),
          },
          subCategory: {
            ...singleProduct?.subCategory,
            subCategoryName: capitalizeEveryWord(
              singleProduct?.subCategory?.subCategoryName
            ),
          },
          unit: {
            ...singleProduct?.unit,
            name: capitalizeEveryWord(singleProduct?.unit?.name),
          },
        };
      });
      setProductList(products);
      setPagination((previousData) => ({
        ...previousData,
        meta: productsBySearch?.meta,
      }));
    }
    if (deleteDone) {
      toast({
        title: "Product Delete Message",
        description: "Product deleted successfully",
      });
      setDeleteDone(false);
    }
  }, [
    productsData?.data,
    productSearch,
    productsBySearch?.data,
    deleteDone,
    toast,
    pagination?.size,
    productsBySearch?.meta,
    productsData?.meta,
  ]);

  if (loadingProducts) {
    return <DataLoader />;
  }

  // PRODUCT ACTIONS AND PRODUCT TABLE COLUMNS
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumb",
      size: 20,
      cell: ({ row }) => {
        const product = row.original as any;
        return (
          <div className="size-8 rounded-md overflow-hidden">
            <PhotoViewer
              className="scale-[2]"
              src={product?.image}
              alt={`Image ${product.productName}`}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "category.categoryName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "subCategory.subCategoryName",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sub-category
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      accessorKey: "brand.brand",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },
    {
      accessorKey: "unit.name",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit
            <ArrowUpDown className="ml-1 size-3" />
          </button>
        );
      },
    },

    {
      header: "Action",
      size: 20,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original as any;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onMouseEnter={() => setActionItem(product)}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuLabel>Product Actions</DropdownMenuLabel>

              {/* EDIT PRODUCT INFORMATION */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  {/* ADD NEW PRODUCT FORM CONTAINER */}
                  <EditProduct actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* PRODUCT DETAILS */}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-start"
                    size="xs"
                  >
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                  {/* ADD NEW PRODUCT FORM CONTAINER */}
                  <ProductDetails actionItem={actionItem} />
                </DialogContent>
              </Dialog>

              {/* PRODUCT DELETE */}
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
                    <AlertDialogTitle className={``}>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This product will be delete permanently. Are you sure you
                      want to delete the product?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-destructive-fill">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      disabled={deleteProductLoading}
                      onClick={async () => {
                        const result = await deleteProduct(product?.id);

                        if (result?.data?.success) {
                          setDeleteDone(true);
                        }
                      }}
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

  return (
    <section>
      <div className="flex justify-end items-end w-full">
        {/* SEARCH PRODUCT  FILED */}
        <div className="flex justify-end items-center space-x-2">
          <InputWrapper
            label="Write product name"
            labelFor="search_product"
            error=""
          >
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setProductSearch(e.target.value)
              }
              className="w-full md:w-[250px]"
              id="search_product"
              placeholder="Write product name for searching"
            />
          </InputWrapper>

          {/* ADD NEW PRODUCT */}
          <InputWrapper label="#" error="" labelFor="add_new_method">
            <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
              <DialogTrigger asChild>
                <Button
                  className="group relative"
                  variant="outline"
                  size="icon"
                >
                  <LuPlus className="h-4 w-4" />
                  <span className="sr-only">Add New Product Button</span>
                  <span className="custom-tooltip-left">Add New Product</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90%] overflow-y-auto">
                {/* ADD NEW PRODUCT FORM CONTAINER */}
                <AddProduct setAddProductOpen={setAddProductOpen} />
              </DialogContent>
            </Dialog>
          </InputWrapper>
        </div>
      </div>
      <div>
        {/*  PRODUCT TABLE CONTAINER */}

        <InfoWrapper className="my-2" heading=" Products Information">
          <DataTable columns={columns} data={productList} />
        </InfoWrapper>

        {/* PAGINATION CONTAINER */}
        <PaginationWrapper
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </section>
  );
};

export default ProductList;
