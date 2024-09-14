import { auth } from '@/auth';
import { Checkout } from '@/components/PaddleCheckout';

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
  const user = session?.user;
  if(!user){
    redirect('/login');
  }
  console.log(user);
  return <Checkout user={user as User} />;
}