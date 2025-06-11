import { cn } from "@/lib/utils";
import Navbar from "@/layouts/Navbar";

type MainLayoutProps = {
    children?: React.ReactNode;
    containerSize?: "1200" | "720" | "full"
    withMarginY?: boolean;
    withNavbar?: boolean;
} & React.ComponentPropsWithoutRef<"main">;

export default function MainLayout({
    children,
    className,
    withMarginY = true,
    containerSize = "full",
    withNavbar = true,
}: MainLayoutProps) {
    return (
        <>
            {withNavbar && (
                <Navbar />
            )}
            <main className={cn(
                withMarginY && "my-6 md:my-8",
                [
                    containerSize === "1200" && "center-xl",
                    containerSize === "720" && "center-lg",
                    containerSize === "full" && "center-full",
                ],
                className
                )}
            >
                {children}
            </main>
        </>
    )
}