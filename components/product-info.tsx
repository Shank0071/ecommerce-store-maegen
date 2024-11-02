"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface ProductInfoProps {
  data: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  const cart = useCart();

  return (
    <div>
      <div className="space-y-2">
        <h2 className="font-bold text-3xl">{data.name}</h2>
        <div className="text-xl">
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-2" />
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-x-4">
          <p className="font-semibold">Size:</p>
          <p>{data?.size?.value}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="font-semibold">Color:</p>
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <Button
          onClick={() => cart.addItem(data)}
          className="mt-4 w-fit rounded-full flex items-center gap-x-2"
        >
          <ShoppingCart size={20} />
          Add to cart
        </Button>
        <hr className="my-2" />
        <div className="flex flex-col">
          <p className="font-semibold">Description:</p>
          <p className="text-slate-600">{data?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
