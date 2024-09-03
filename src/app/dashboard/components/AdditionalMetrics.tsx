import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dbConnect from "@/lib/dbConnect"
import Space from "@/models/space.model"
import { Box } from "lucide-react"



export default async function AdditionalMetrics() {
  await dbConnect()
  const session = await auth();
  if(!session) return null;
  const userId = session.user?.id;
  const totalSpaces = await Space.find({ owner: userId }).countDocuments()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle  className="text-sm font-medium">Total Spaces</CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
      <div  className="text-4xl font-bold">
                    {totalSpaces}
                  </div>
                
            
      </CardContent>
    </Card>
  )
}