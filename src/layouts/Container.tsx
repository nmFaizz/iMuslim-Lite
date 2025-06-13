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
        <div 
            className={cn(
                className,
                "p-5 rounded-lg",
                "border border-muted-foreground/20",
            )}
            {...props}
        >
            {children}
        </div>
    )
}