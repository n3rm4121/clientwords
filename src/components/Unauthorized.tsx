'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

const Unauthorized: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex items-center space-x-2">
                    <ShieldAlert className="text-red-500 w-8 h-8" />
                    <CardTitle className="text-xl font-semibold">Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mt-2 mb-6">
                        You don’t have permission to view this page. Please check your credentials or contact the administrator if you believe this is a mistake.
                    </p>
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            className="w-full mr-2"
                            onClick={() => router.back()}
                        >
                            Go Back
                        </Button>
                        <Button
                            variant="default"
                            className="w-full ml-2"
                            onClick={() => router.push("/")}
                        >
                            Go to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Unauthorized;