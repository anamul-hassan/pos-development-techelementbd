import { FC } from "react";
import { LucideGlobe } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";

interface IInternationalizeToggleProps {}

const InternationalizeToggle: FC<IInternationalizeToggleProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideGlobe className="button-icon-size" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="font-anek"

          // PLEASE DO NOT UNMASK THE BELOW LINE
          // onClick={() => i18n.changeLanguage("bn")}
        >
          বাংলা pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InternationalizeToggle;
