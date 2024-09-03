'use client';
import { useState } from 'react';
import { Loader2, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { deleteAccount } from '../../action'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function DeleteAccount() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleDeleteAccount = async () => {
        setLoading(true);
        await deleteAccount(session?.user?.id as string);
        setLoading(false);
    };

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Trash className="mr-3 text-red-600" /> Delete Account
            </h2>
            <div className="space-y-4">
                <p className="text-gray-700">
                    Deleting your account will remove all of your data from our system.
                    This action is irreversible.
                </p>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </section>
    );
}