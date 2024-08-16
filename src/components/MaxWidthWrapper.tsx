import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({
    className, children }: {
        className?:string, children: React.ReactNode }) => {
    return (
        <div className={cn("max-w-7xl mx-auto px-2.5 md:px-20 w-full",className)}>
        {children}
        </div>
    );
    }