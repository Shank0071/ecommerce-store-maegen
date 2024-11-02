"use client"

import { ColumnDef } from "@tanstack/react-table"
import Currency from "@/components/ui/currency"

export type OrderSummaryColumn = {
  name: string
  description: string
  price: string
  quantity: number
  amount: number
}

export const columns: ColumnDef<OrderSummaryColumn>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({row}) => <p>{row.original.name}</p>
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <Currency value={row.original.price} />
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <Currency value={Number(row.original.price) * row.original.quantity} />
  },
]
