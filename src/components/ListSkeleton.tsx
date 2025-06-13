import { Skeleton } from "@/components/ui/skeleton"

export default function ListSkeleton() {
    return (
        <div className="space-y-4">
            {new Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-full h-[170px]" />
            ))}
        </div>
    )
}