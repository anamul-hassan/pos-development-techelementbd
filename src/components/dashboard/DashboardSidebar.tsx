import React, { FC } from "react";
import { useAppContext } from "@/context/hook/useAppContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ADMIN_NAVIGATION_LINKS,
  INavigationLinks,
  user_management_links_admin,
  user_management_links_others,
} from "@/utils/constants/navigation/navigation_links";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { LucideLogOut } from "lucide-react";
import { shareWithCookies } from "@/utils/helpers/shareWithCookies";
import { shareWithLocal } from "@/utils/helpers/shareWithLocal";
import { shareBranchAndUserInfo } from "@/utils/helpers/shareBranchAndUserInfo";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { Button } from "../ui/button";

interface IDashboardSidebarProps {
  mouseEnter: boolean;
  setMouseEnter: (mouseEnter: boolean) => void;
}

const DashboardSidebar: FC<IDashboardSidebarProps> = ({
  mouseEnter,
  // setMouseEnter,
}) => {
  const { role } = shareBranchAndUserInfo();
  const navigationLinks =
    role.toLowerCase() === "admin"
      ? [{ ...user_management_links_admin }, ...ADMIN_NAVIGATION_LINKS]
      : [{ ...user_management_links_others }, ...ADMIN_NAVIGATION_LINKS];

  const userData = shareBranchAndUserInfo();

  // NAVIGATION HOOK
  const navigate = useNavigate();

  const { sidebarOpen } = useAppContext();

  // // LOGOUT HANDLER
  const handleLogout = async () => {
    shareWithCookies("remove", `${CLIENT_DETAILS.companyCode}token`);
    shareWithLocal("remove", `${CLIENT_DETAILS.companyCode}user`);
    navigate("/auth/login", { replace: true });
    window.location.reload();
  };

  return (
    <aside
      className={`${
        sidebarOpen
          ? "w-[260px] md:w-[280px] 2xl:w-[300px] border-r dark:border-border"
          : "w-24 lg:w-[80px] border-opacity-0 border-r-0"
      }  ${
        mouseEnter &&
        "after:absolute after:content-[''] after:w-full after:h-full brightness-95 opacity-80 blur-[0.2px]"
      } relative h-screen duration-200 ease-linear transition-all flex flex-col z-20 border-opacity-60 overflow-hidden bg-tertiary dark:bg-accent border-tertiary`}
    >
      {/* SPACE FOR BRAND LOGO */}
      <div
        className={`h-32 flex items-center gap-2 text-white ${
          sidebarOpen ? "px-4" : "px-3 lg:px-5"
        }`}
      >
        <Link to="/">
          <img
            className={`${sidebarOpen ? "size-10" : "size-7"} rounded-full`}
            src={CLIENT_DETAILS.sidebarLogo}
            alt={CLIENT_DETAILS.companyName}
          />
        </Link>
        {sidebarOpen && (
          <ul>
            <li>{userData?.name}</li>
            <li className="bg-accent/10 px-2 rounded-full lowercase leading-5 font-thin text-xs">
              {userData?.role}
            </li>
          </ul>
        )}
      </div>

      <div className="max-h-full overflow-y-auto scroll-hidden flex flex-col justify-between h-full">
        {/* NAVIGATION BAR */}
        <nav>
          {navigationLinks?.length > 0 && (
            <Accordion type="multiple">
              {navigationLinks?.map(
                (grouplink: INavigationLinks, groupIndex: number) => (
                  <AccordionItem
                    className="border-b-0"
                    key={groupIndex}
                    value={groupIndex.toString()}
                  >
                    {/* GROUP BUTTON TRIGGER */}
                    <AccordionTrigger
                      className={`text-tertiary-foreground px-4 h-12 ${
                        sidebarOpen ||
                        "md:pl-[15%] lg:pl-[22%] xl:pl-[27%] 2xl:pl-[26%]"
                      } hover:no-underline hover:bg-accent/10 dark:hover:bg-tertiary-foreground/10  hover:cursor-pointer text-base font-semibold transition-opacity opacity-100 delay-1000 overflow-hidden truncate max-w-full ${
                        sidebarOpen || ""
                      }`}
                    >
                      {grouplink?.icon && (
                        <i>
                          {React.createElement(grouplink?.icon, {
                            className: `whitespace-nowrap size-[20px] opacity-100 lg:size-[26px] ${
                              sidebarOpen || "mr-32"
                            }`,
                          })}
                        </i>
                      )}

                      <label
                        className={`w-full text-left ml-2 hover:cursor-pointer ${
                          sidebarOpen || "md:hidden"
                        }`}
                      >
                        {grouplink?.label?.en}
                      </label>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      {grouplink?.sublinks &&
                        grouplink?.sublinks?.length > 0 && (
                          <ul>
                            {grouplink?.sublinks?.map(
                              (
                                sublink: INavigationLinks,
                                sublinkIndex: number
                              ) => (
                                // SINGLE NAVIGATION ITEM
                                <li key={sublinkIndex}>
                                  <NavLink
                                    to={`${sublink.href}`}
                                    className={({ isActive, isPending }) =>
                                      isPending
                                        ? "pending"
                                        : isActive
                                        ? `inline-flex px-4 bg-accent/10 dark:bg-tertiary-foreground/10 text-tertiary-foreground w-full   transition-all duration-200  text-base h-12 items-center opacity-100 overflow-hidden truncate max-w-full border-l-4 border-white/50 pl-8 lg:pl-6 ${
                                            sidebarOpen ||
                                            "md:pl-[15%] lg:pl-[22%] xl:pl-[27%] 2xl:pl-[26%]"
                                          }`
                                        : `inline-flex px-4 bg-tertiary/20 text-tertiary-foreground w-full  dark:bg-tertiary-foreground/5 
                                        dark:hover:bg-tertiary-foreground/10 
                                        hover:bg-accent/10 transition-all duration-200 text-base h-12 items-center opacity-100 overflow-hidden truncate max-w-full border-l-4 border-white/50 ${
                                          sidebarOpen
                                            ? "hover:pl-8"
                                            : "md:pl-[15%] lg:pl-[22%] xl:pl-[27%] 2xl:pl-[26%]"
                                        }`
                                    }
                                  >
                                    {sublink?.icon && (
                                      <i>
                                        {React.createElement(sublink.icon, {
                                          className: `whitespace-nowrap w-[20px] h-[20px] opacity-100 lg:w-[26px] lg:h-[26px] ${
                                            sidebarOpen || "mr-32"
                                          }`,
                                        })}
                                      </i>
                                    )}

                                    <label
                                      className={`w-full text-left ml-2 hover:cursor-pointer ${
                                        sidebarOpen || "md:hidden"
                                      }`}
                                    >
                                      {sublink?.label?.en}
                                    </label>
                                  </NavLink>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          )}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="f">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className={`cursor-pointer flex items-center justify-center  ${
                  sidebarOpen
                    ? "w-3/4 my-4 h-8 mx-auto"
                    : " rounded-none md:w-[65%] lg:w-[85%] h-12"
                } `}
              >
                <LucideLogOut className="dropdown-icon size-4 mr-1" />
                <label
                  className={`cursor-pointer ${sidebarOpen || "md:hidden"}`}
                >
                  Logout
                </label>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out? Logging out will end your
                  current session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="btn-destructive-fill">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => handleLogout()}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
