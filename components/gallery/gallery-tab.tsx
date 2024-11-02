import Image from "next/image";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@/types";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <div
      className="w-[100px] group cursor-pointer rounded-xl"
    >
      <div className="aspect-square rounded-xl relative">
        <Image
          fill
          alt="Image"
          src={image.url}
          className="aspect-square object-cover rounded-md"
        />
       
      </div>
    </div>
  );
};

export default GalleryTab;
