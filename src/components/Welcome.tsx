'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateUniqueLink } from "@/utils/generateUniqueLink"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { z } from "zod"
import { completeOnboarding } from "@/app/dashboard/action"
import { useSession } from "next-auth/react"

export const Welcome = () => {
    const { data: session, status } = useSession()
    const router = useRouter();

    const [name, setName] = useState('')
    const [errors, setErrors] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null); // Set userId state

    // Monitor session status and set userId once session is available
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            setUserId(session.user.id);
        }
    }, [status, session]);

    const createSpaceSchema = z.object({
        name: z.string().max(50, 'Name must be less than 50 characters').min(3, 'Name must be at least 3 characters'),
    });

    const handleCreateSpace = useCallback(async (name: string) => {
        try {
            createSpaceSchema.parse({ name });
            setLoading(true);
            const res = await axios.post('/api/space', { name });

            setErrors({});
            await completeOnboarding(userId!); // Use the userId from state
            router.push(`/dashboard/spaces/${name}/${res.data.space._id}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof z.ZodError) {
                const formattedErrors = error.format();
                setErrors(formattedErrors);
            } else if (axios.isAxiosError(error)) {
                console.error('API Error:', error.response?.data || error.message);
            }
        }
    }, [userId]);

    if (status === 'loading') {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    if (status === 'unauthenticated') {
        router.push('/login'); // Redirect if unauthenticated
        return null;
    }

    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Let's Create Your First Space🚀</DialogTitle>
                    <DialogDescription>
                        Each Space Represents Your Business or Project. <br />
                        {generateUniqueLink(name, 'Space_Id')}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="eg. My Business"
                        className="col-span-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name && (
                        <span className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</span>
                    )}
                </div>
                <DialogFooter>
                    <Button loading={loading} onClick={() => handleCreateSpace(name.trim())}>
                        Create New Space
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
