'use client'

import { Input } from '@/components/ui/input';
import React from 'react'

function page() {
  const [inputVal, setInputVal] = React.useState<string>('')
  return (
    <div>

        <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)}/>
        <h1>{inputVal}</h1>
    </div>
  )
}

export default page