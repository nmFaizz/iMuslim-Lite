import { cn } from "@/lib/utils"

type ContainerProps = {
    children?: React.ReactNode;
    className?: string;
    withPadding?: boolean;
    withBorder?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default function Container({
    children,
    className,
    withPadding = true,
    ...props
}: ContainerProps) {
    return (
        <div className={cn(
            className,
            "w-full px-4"
        )}>

        </div>
    )
}