import { auth } from '@/auth';
import { Checkout } from '@/components/pricing/PaddleCheckout';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Checkout',
};

interface User {
  id: string;
  email: string;
  customerId?: string;
}
export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  const user = session?.user;
  return <Checkout user={user as User} />;
}