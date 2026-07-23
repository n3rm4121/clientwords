import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dbConnect from "@/lib/dbConnect"
import Space from "@/models/space.model"
import { LayoutGrid } from "lucide-react"

export default async function AdditionalMetrics() {
  await dbConnect()
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;
  const totalSpaces = await Space.find({ owner: userId }).countDocuments()

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Spaces</CardTitle>
        <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50">
          <LayoutGrid className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{totalSpaces}</div>
        <p className="text-xs text-muted-foreground mt-1">active workspaces</p>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0" />
    </Card>
  )
}
