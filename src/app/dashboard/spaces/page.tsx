import { auth } from '@/auth';
import { ShowSpaces } from '@/components/space/SpaceCard';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.model';
import { Welcome } from '@/components/Welcome';
import { canCreateSpace } from '@/lib/featureAccess';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

export default async function Spaces() {
  const session = await auth();
  if (!session) return null;

  const userId = session.user?.id;
  await dbConnect();

  const userData = await User.findById(userId).select('isNewUser subscriptionTier subscriptionEndDate spaces').exec();

  if (userData.isNewUser) {
    return <Welcome />;
  }

  const canCreate = canCreateSpace(userData.subscriptionTier, userData.spaces.length);

  return (
    <div className="space-y-6">
      {!canCreate && (
        <Alert className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4">
          <Terminal className="h-4 w-4 mr-2" />
          <div>
            <AlertTitle className="font-bold">Heads up!</AlertTitle>
            <AlertDescription>
              You have reached the limit of spaces for your current subscription tier. Please upgrade your subscription to create more spaces.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <ShowSpaces subscriptionTier={userData.subscriptionTier} />
    </div>
  );
}
