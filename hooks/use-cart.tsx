import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAllProds: (id:string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem && existingItem.quantity >= 6) {
      return toast.error('Cannot add more than 6 of the same item. Contact us for bulk orders.');
    }

    if (existingItem) {
      set({
        items: currentItems.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
      toast.success('Item quantity updated in cart.');
    } else {
      set({ items: [...currentItems, { ...data, quantity: 1 }] });
      toast.success('Item added to cart.');
    }

  },
  removeItem: (id: string) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id === id)

    if(!existingItem) {
      return 
    }
    if (existingItem.quantity > 1) {
      set({
        items: currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });

    } else {
      set({ items: currentItems.filter((item) => item.id !== id) });
      toast.success('Item removed from cart.');
    }
  },
  removeAllProds :(id: string) => {
    const currentItems = get().items
    set({ items: currentItems.filter(item => item.id !== id) })
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;
