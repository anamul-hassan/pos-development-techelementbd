import { cn } from "@/lib/utils";
import { FC } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface IPhotoViewWrapperProps {
  src: string;
  alt: string;
  className?: string;
}

const PhotoViewer: FC<IPhotoViewWrapperProps> = ({ src, className, alt }) => {
  return (
    <PhotoProvider>
      <PhotoView src={src || "./not_available.png"}>
        <img
          className={cn("cursor-pointer object-cover", className)}
          src={src || "./not_available.png"}
          alt={alt}
        />
      </PhotoView>
    </PhotoProvider>
  );
};

export default PhotoViewer;

//  className={cn("w-full flex flex-col", className)}
