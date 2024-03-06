import { Loader2 } from "lucide-react";
import { FC } from "react";

interface IButtonLoaderProps {}

const ButtonLoader: FC<IButtonLoaderProps> = () => {
  return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
};

export default ButtonLoader;
