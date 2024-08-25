import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Home</SelectLabel>
          <SelectItem value="rent">🏡 Rent</SelectItem>
          <SelectItem value="groceries">🛒 Groceries</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Leisure</SelectLabel>
          <SelectItem value="travel">🏖️ Travel</SelectItem>
          <SelectItem value="restourant">🍝 Restourant</SelectItem>
          <SelectItem value="streaming">🍿 Streaming</SelectItem>
          <SelectItem value="coffe">
            ☕ Coffe
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
