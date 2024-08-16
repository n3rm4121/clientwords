
import { redirect } from 'next/navigation'
import { auth } from "@/auth"

export default async function ProtectedWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const session = await auth()

  if (!session) {
    redirect('auth/login')
  }else{
    return <>{children}</>

  }
  
 
}