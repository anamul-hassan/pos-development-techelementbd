import { FC } from "react";
import InternationalizeToggle from "../InternationalizeToggle";
import { ModeToggle } from "../ModeToggle";
import { LucideAlignLeft, LucideBellRing, LucideUser2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuLayoutGrid } from "react-icons/lu";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";

interface IDashboardUpperNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  setMouseEnter: (mouseEnter: boolean) => void;
}

const DashboardUpperNav: FC<IDashboardUpperNavProps> = ({
  sidebarOpen,
  setSidebarOpen,
  setMouseEnter,
}) => {
  return (
    <nav
      className={`w-screen md:w-full overflow-hidden py-1 md:py-1.5 absolute left-0 top-0 z-50 transition-all duration-500 backdrop-blur-sm border-b px-2 md:px-8 bg-tertiary/5`}
    >
      <div className="flex justify-between items-center">
        {/* SIDEBAR BUTTON FOR CLOSING OR OPENING */}
        <ul className="flex items-center">
          <li>
            <Button
              variant="outline"
              size="icon"
              onPointerDown={(event: React.PointerEvent) =>
                event.pointerType === "touch" && setMouseEnter(false)
              }
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <LucideAlignLeft className="h-[1.2rem] w-[1.2rem] text-lg opacity-80" />
              <span className="sr-only">Sidebar Open</span>
            </Button>
          </li>
        </ul>

        <ul className="hidden items-center max-w-full gap-x-2 md:flex">
          <li>
            <Link to="/">
              <Button variant="warning" size="xs">
                Due
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/customers_list">
              <Button variant="tertiary" size="xs">
                Customer
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/add_sale">
              <Button size="xs">Sale</Button>
            </Link>
          </li>
          <li>
            <Link to="/day_book_report">
              <Button size="xs">Day-book</Button>
            </Link>
          </li>
        </ul>

        {/* CUSTOMIZABLE BUTTON FOR LANGUAGE AND THEME */}
        <ul className="flex items-center justify-between gap-x-2">
          {/* BUTTON FOR NOTIFICATION */}
          <li className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <LuLayoutGrid className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link className="w-full" to="/">
                    <Button className="w-full" variant="warning" size="xs">
                      Due
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full" to="/customers_list">
                    <Button className="w-full" variant="tertiary" size="xs">
                      Customer
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full" to="/add_sale">
                    <Button className="w-full" size="xs">
                      Sale
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full" to="/day_book_report">
                    <Button className="w-full" size="xs">
                      Day-book
                    </Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <LucideBellRing className="button-icon-size" />
                  <span className="sr-only">Notification Button</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                {CLIENT_DETAILS.progressMessage}
              </PopoverContent>
            </Popover>
          </li>
          {/* BUTTON FOR LANGUAGE CHANGE */}
          <li>
            <InternationalizeToggle />
          </li>
          {/* BUTTON FOR THEME CHANGE */}
          <li>
            <ModeToggle />
          </li>
          <li className="-mb-2 p-0 dark:grayscale dark:brightness-50">
            <Button size="icon" variant="outline">
              <Avatar className="rounded-md scale-[0.97]">
                <AvatarImage src="https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png" />
                <AvatarFallback>
                  <LucideUser2 />
                </AvatarFallback>
              </Avatar>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardUpperNav;
