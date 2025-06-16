import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function ListSkeleton({
    className
}: React.ComponentProps<'div'>) {
    return (
        <div className={cn("space-y-4", className)}>
            {new Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-full h-[170px]" />
            ))}
        </div>
    )
}