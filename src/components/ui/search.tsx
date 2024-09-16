'use client'

import { Input } from "@/components/ui/input"

export default function Search({ placeholder, onSearch, disabled }: { placeholder: string,disabled?:boolean, onSearch: (query: string) => void }) {
  return (
    <div>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}