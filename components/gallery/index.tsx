"use client";

import Image from "next/image";

import { Image as ImageType } from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tabs defaultValue={images[0].id} className="w-[300px] md:w-[400px]">
      {images.map((image) => (
        <TabsContent key={image.id} value={image.id}>
          <div className="bg-white group cursor-pointer rounded-xl p-2 shadow-md">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
              <Image
                fill
                alt="Image"
                src={image.url}
                className="aspect-square object-cover rounded-md"
              />
            </div>
          </div>
        </TabsContent>
      ))}
      <div className="mt-10">
        <TabsList className="p-0 h-fit bg-transparent">
          {images.map((image) => (
            <TabsTrigger
              className="w-[100%] h-[100%] data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:"
              value={image.id}
              key={image.id}
            >
              <GalleryTab image={image} />
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
};

export default Gallery;
