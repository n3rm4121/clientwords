import { canCreateSpace } from "@/lib/featureAccess";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { generateUniqueLink } from '@/utils/generateUniqueLink';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
import { getUserSpaceCount } from "../../action";
import { toast } from 'react-toastify';
import axios from "axios";
import { z } from 'zod'
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";

// Regular expression to allow only alphabets and hyphen, no underscores, no numbers
const validNameRegex = /^[a-zA-Z-]+$/;

const createSpaceSchema = z.object({
    name: z
        .string()
        .max(50, 'Name must be less than 50 characters')
        .min(3, 'Name must be at least 3 characters')
        .regex(validNameRegex, 'Name can only contain letters and hyphens, no numbers or special characters')
        .refine((name) => {
            const nameLowerCase = name.toLowerCase();
            return !reservedKeywords.includes(nameLowerCase);
        }, {
            message: 'This name is reserved and cannot be used.',
        })
});


const reservedKeywords = [
    'admin', 'clientwords', 'clienword', 'dashboard', 'profile', 'settings', 'login', 'signup', 'api', 'space', 'spaces', 'user', 'users',
    'system', 'help', 'support', 'about', 'terms', 'privacy', 'home', 'localhost', 'test'
];




export function AddSpace({ addSpace, subscriptionTier }: { subscriptionTier: any, addSpace: (newSpace: any) => void }) {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [spaceCount, setSpaceCount] = useState(0);
    const session = useSession();
    const user = session.data?.user;
    const router = useRouter();
    const can = canCreateSpace(subscriptionTier, spaceCount);

    // Fetch user space count
    useEffect(() => {
        const fetchSpaceCount = async () => {
            try {
                if (user?.id) {
                    const count = await getUserSpaceCount(user.id);
                    setSpaceCount(count);
                }
            } catch (error) {
                toast.error('Error fetching space count');
                console.error(error);
            }
        };

        fetchSpaceCount();
    }, [user]);

    const handleCreateSpace = useCallback(async (name: string) => {
        try {
            setLoading(true);

            createSpaceSchema.parse({ name });

            const res = await axios.post('/api/space', { name });

            addSpace(res.data.space);
            setLoading(false);
            setErrors({});

            router.push(`/dashboard/spaces/${name}/${res.data.space._id}`);
        } catch (error) {
            setLoading(false);
            if (error instanceof z.ZodError) {
                const formattedErrors = error.format();
                setErrors(formattedErrors);
            } else if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    }, [addSpace, router]);


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={!can}>
                        Create New Space
                        {(!user?.isProUser || spaceCount >= 1) && <Gem className="ml-2 h-4 w-4" />}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-w-xs">
                    <DialogHeader>
                        <DialogTitle>Create Space</DialogTitle>
                        <DialogDescription>
                            <span className="text-blue-500">
                                {generateUniqueLink(name)}
                            </span>
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
                            disabled={loading || !can}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors?.name && (
                            <span className="text-red-500 text-sm mt-1">{errors.name._errors[0]}</span>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            loading={loading}
                            onClick={() => handleCreateSpace(name.replace(/\s+/g, ''))}
                            disabled={!can || loading}
                        >
                            Create New Space
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
