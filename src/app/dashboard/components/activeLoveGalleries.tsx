import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import dbConnect from "@/lib/dbConnect"
import LoveGallery from "@/models/loveGallery.model";
import { auth } from "@/auth";
import { BookHeart } from "lucide-react";

export default async function ActiveLoveGallery() {

  const session = await auth();
  if (!session) return null;
  const userId = session.user?.id;

  await dbConnect();
  const activeLoveGalleries = await LoveGallery.find({ owner: userId }).countDocuments();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

        <CardTitle className="text-sm font-medium">Total Love Gallery</CardTitle>
        <BookHeart className="h-4 w-4 " />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {activeLoveGalleries}
        </div>

      </CardContent>

    </Card>
  )
}