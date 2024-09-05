'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { updateName } from "../../action";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ProfileSettings() {
    const { data: session } = useSession();
    const [name, setName] = useState(session?.user?.name);
    const [email, setEmail] = useState(session?.user?.email);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            if (!session) return;

            try {
                const data = await fetch('/api/user').then((res) => res.json());
                if (session?.user?.email !== data.userData.email) return;

                setName(data.userData.name);
                setEmail(data.userData.email);
            } catch (error) {
                console.error(error);
            }
        };

        getUserData();
    }, [session]);


    const handleSaveName = async () => {
        setLoading(true);
        await updateName(session?.user?.id as string, name as string);
        setIsEditing(false);
        setLoading(false);
    };
    return (
        <Card className="mb-12 p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
                <User className="mr-3 text-blue-600" /> Profile Settings
            </h2>
            <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <Label>Name</Label>
                    <Input
                        disabled={!isEditing || loading}
                        type="text"
                        className="mt-1"
                        value={name ?? ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing((prev) => !prev)}
                            disabled={loading}
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        {isEditing && (
                            // <Button onClick={handleSaveName} disabled={loading}>
                            //     {loading ? (
                            //         <Loader2 className="animate-spin mr-2" size={16} />
                            //     ) : (
                            //         'Save'
                            //     )}
                            // </Button>
                            <Button onClick={handleSaveName} loading={loading}>
                                Save
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Email</Label>
                    <Input
                        type="email"
                        className="mt-1"
                        value={email ?? ''}
                        disabled
                    />
                </div>
            </div>
        </Card>
    )
}