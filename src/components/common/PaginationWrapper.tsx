import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface IPagination {
  size: number;
  page: number;
  meta: {
    page: number | null;
    size: number | null;
    total: number | null;
    totalPage: number | null;
  };
}

interface IPaginationWrapperProps {
  setPagination: (pagination: IPagination) => void;
  pagination: IPagination;
}

const PaginationWrapper: FC<IPaginationWrapperProps> = ({
  pagination,
  setPagination,
}) => {
  return (
    <div className="w-full  pb-12 flex justify-between items-center flex-col md:flex-row">
      <div className="w-full md:w-1/2 text-center md:text-start">
        <p className="text-sm text-muted-foreground">
          {pagination?.meta?.total} of{" "}
          {pagination?.size?.toString() === "1000000"
            ? "all"
            : pagination?.size}{" "}
          row&#40;s&#41; selected
        </p>
      </div>
      <Pagination className="w-full md:w-1/2 flex justify-center md:justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: pagination.page - 1,
                })
              }
              size="xs"
              variant="outline"
              disabled={pagination?.page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              disabled={pagination?.meta?.totalPage === pagination?.page}
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: pagination?.page + 1,
                })
              }
              size="xs"
              variant="outline"
            >
              {pagination?.page + 1}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Select
              value={pagination?.size?.toString()}
              onValueChange={(value: string) =>
                setPagination({
                  ...pagination,
                  size: +value,
                })
              }
            >
              <SelectTrigger className="w-[70px] border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-2">
                <SelectValue placeholder="Item size" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="1000000">All</SelectItem>
              </SelectContent>
            </Select>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: pagination?.page + 1,
                })
              }
              size="xs"
              variant="outline"
              disabled={pagination?.meta?.totalPage === pagination?.page}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
