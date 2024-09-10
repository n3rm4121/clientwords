'use client'

import { Input } from "@/components/ui/input"

export default function Search({ placeholder, onSearch }: { placeholder: string, onSearch: (query: string) => void }) {
  return (
    <div>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}