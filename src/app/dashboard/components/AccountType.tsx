'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, User } from 'lucide-react'
import React from 'react'

function AccountType({ accountType }: { accountType: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium ">Account Type</CardTitle>
        <User className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {accountType}
        </div>


      </CardContent>
    </Card>
  )
}

export default AccountType