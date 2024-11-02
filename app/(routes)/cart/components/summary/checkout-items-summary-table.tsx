import { columns } from "./columns";
import Currency from "@/components/ui/currency";
import { DataTable } from "./data-table";
import useCart from "@/hooks/use-cart";

function CheckoutItemsSummaryTable({ data }: any) {
  const cart = useCart();

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div>
      <h2 className="my-6 text-lg font-medium text-gray-900 ">Order summary</h2>
      <DataTable columns={columns} data={data} />

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutItemsSummaryTable;
