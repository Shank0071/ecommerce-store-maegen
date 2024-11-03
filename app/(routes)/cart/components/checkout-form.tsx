"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";

const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must contain at least 2 characters(s)",
  }),
  email: z.string().email(),
  phoneNumber: z.string().min(10, {
    message: "Invalid phone number",
  }),
  addressLine: z.string().min(2, {
    message: "Address too short",
  }),
  city: z.string().min(2, {
    message: "Invalid city",
  }),
  state: z.string().min(2, {
    message: "Invalid state",
  }),
  country: z.string().default("India"),
  zipcode: z.string().min(6, {
    message: "Invalid zipcode",
  }),
});

export const CheckoutForm = ({ items }: any) => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCart()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      state: "",
      zipcode: "",
      country: "India",
    },
  });


  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const makePayment = async (values: z.infer<typeof formSchema>) => {
 
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkoutrazorpay`,
      {
        productIds: items.map((item: any) => [item.id, item.quantity]),
        values: values,
        totalPrice
      }
    );

    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Pulmach",
      currency: data.currency,
      notes: data.notes,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for shopping with us!",
      image:
        "https://res.cloudinary.com/dcofa59ec/image/upload/v1699117747/w9qywltavzj5eolszl9h.jpg",
      handler: async function (response: any) {
        // TODO: Polling to verify payment status from webhook
        if (
          response.razorpay_payment_id &&
          response.razorpay_signature &&
          response.razorpay_order_id
        ) {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/verifyOrder?oid=${response.razorpay_order_id}`
          );
          if (data.success) {
            router.push(pathname + "?" + createQueryString("success", "1"));
          } else if (data.failed) {
            router.push(pathname + "?" + createQueryString("canceled", "1"));
          }
        } else {
          // router.push(pathname + "?" + createQueryString("canceled", "1"));
          alert("something went wrong");
        }
      },
      prefill: {
        name: data.notes.name,
        contact: data.notes.phone,
        email: data.notes.email
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    return 1
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      await makePayment(values);
      form.reset()
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false)
    }
  };

  return (
    <section className="grid">
      <div className="py-1">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Country" {...field} />
                  </FormControl>
                  <FormDescription>
                    Only India is supported currently
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-md px-4 py-2 text-center text-background"
              disabled={loading || form.formState.isSubmitting || items.length === 0}
            >
              {form.formState.isSubmitting ? (
                <div className="flex flex-row items-center gap-2">
                  <span>Loading</span>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Checkout"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
