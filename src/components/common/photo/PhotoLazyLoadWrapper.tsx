import { cn } from "@/lib/utils";
import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { FC } from "react";
import LazyLoad from "react-lazy-load";
interface IPhotoLazyLoadWrapperProps {
  src: string;
  alt: string;
  className?: string;
}

const PhotoLazyLoadWrapper: FC<IPhotoLazyLoadWrapperProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <LazyLoad>
      <img
        className={cn("object-cover", className)}
        src={src || "/not_available.png"}
        alt={alt || `product of ${CLIENT_DETAILS.companyName}`}
      />
    </LazyLoad>
  );
};

export default PhotoLazyLoadWrapper;
