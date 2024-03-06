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
      className={`w-screen md:w-full overflow-hidden py-1 md:py-1.5 border-b-[1px] absolute left-0 top-0 z-50 transition-all duration-500 backdrop-blur-sm border-tertiary px-2 md:px-8 bg-tertiary/5`}
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

        <ul className="flex items-center max-w-full gap-x-2">
          <li>
            <Link to="/">
              <Button variant="success" size="rounded">
                Sell
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button variant="warning" size="rounded">
                Due
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button variant="tertiary" size="rounded">
                Customer
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/pos_list">
              <Button size="rounded">POS</Button>
            </Link>
          </li>
          <li>
            <Link to="/day_book_report">
              <Button size="rounded">Day-book</Button>
            </Link>
          </li>
        </ul>

        {/* CUSTOMIZABLE BUTTON FOR LANGUAGE AND THEME */}
        <ul className="flex items-center justify-between gap-x-2">
          {/* BUTTON FOR NOTIFICATION */}
          <li>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <LucideBellRing className="button-icon-size" />
                  <span className="sr-only">Notification Button</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                Place content for the popover here.
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
          <li>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn. png" />
              <AvatarFallback>
                <LucideUser2 />
              </AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardUpperNav;
