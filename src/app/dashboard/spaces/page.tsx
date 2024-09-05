import { auth } from '@/auth';
import { ShowSpaces } from '@/components/space/SpaceCard';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.model';
import { Welcome } from '@/components/Welcome';

export default async function Spaces() {
  const session = await auth();
  if(!session) return null;
  const userId = session.user?.id;
  await dbConnect();
  const userData= await User.findById(userId).select('isNewUser');

  if (userData.isNewUser) {
    return <Welcome  />
  }
  return (

  <ShowSpaces />

  );
}
