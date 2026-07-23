'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gem, Sparkles } from 'lucide-react'
import Link from 'next/link'

function AccountType({ accountType }: { accountType: string }) {
  const isPro = accountType !== 'Free'

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Account Plan</CardTitle>
        <div className={`p-2 rounded-lg ${isPro ? 'bg-amber-50 dark:bg-amber-950/50' : 'bg-slate-50 dark:bg-slate-900/50'}`}>
          <Gem className={`h-4 w-4 ${isPro ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tight">{accountType}</span>
          {isPro && <Sparkles className="h-5 w-5 text-amber-500" />}
        </div>
        {!isPro ? (
          <Link href="/#pricing" target="_blank" className="text-xs text-primary hover:underline mt-1 block">
            Upgrade for more →
          </Link>
        ) : (
          <p className="text-xs text-muted-foreground mt-1">Full access enabled</p>
        )}
      </CardContent>
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${isPro ? 'from-amber-500/0 via-amber-500/50 to-amber-500/0' : 'from-slate-500/0 via-slate-500/30 to-slate-500/0'}`} />
    </Card>
  )
}

export default AccountType
