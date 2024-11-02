"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";


const NavbarActions = () => {
  
  const cart = useCart()
  const router = useRouter()

  return (
    <div className="ml-auto flex items-center justify-center gap-x-4">
      <Button onClick={() => router.push("/cart")} className="rounded-full">
        <ShoppingBag color="white" size="icon" />
        <span>{cart.items.length}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
