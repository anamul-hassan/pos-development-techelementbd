import { FC } from "react";

interface Image {
  src: any;
  alt: any;
  divClass: any;
  imgClass: any;
}
const Image: FC<Image> = ({ src, alt, divClass, imgClass }) => {
  return (
    <div className={divClass}>
      <img className={imgClass} src={src} alt={alt} />
    </div>
  );
};

export default Image;
