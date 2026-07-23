import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dbConnect from "@/lib/dbConnect"
import LoveGallery from "@/models/loveGallery.model";
import { auth } from "@/auth";
import { Heart } from "lucide-react";

export default async function ActiveLoveGallery() {
  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  await dbConnect();
  const activeLoveGalleries = await LoveGallery.find({ owner: userId }).countDocuments();

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Love Galleries</CardTitle>
        <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50">
          <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{activeLoveGalleries}</div>
        <p className="text-xs text-muted-foreground mt-1">embed-ready galleries</p>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-rose-500/0" />
    </Card>
  )
}
