import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeAllProds(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.name} x {data.quantity}
            </p>
          </div>
          <div className="flex w-min flex-row gap-1 rounded-lg border p-1">
            <Button
              className="h-5 w-5"
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                cart.removeItem(data.id);
              }}
            >
              <MinusIcon size={15} />
            </Button>
            <span className="min-w-5 px-1 text-center text-sm">
              {data.quantity}
            </span>
            <Button
              className="h-5 w-5"
              variant={"ghost"}
              size={"icon"}
              onClick={() => cart.addItem(data)}
            >
              <PlusIcon size={15} />
            </Button>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>

          <Currency value={data.price} />
        </div>
        <div>
          <div className="flex">
            <Currency value={data.price} />
            <span className="mx-2">x {data.quantity} =</span>
            <Currency value={Number(data.price) * data.quantity} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
