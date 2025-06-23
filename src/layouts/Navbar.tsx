"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Loader2Icon, Menu, X, Bookmark } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import useSession from "@/hooks/useSession"

export default function Navbar() {
        const { setTheme } = useTheme()
        const { session } = useSession()
        const router = useRouter()
        const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

        const { isPending, mutate } = useMutation({
            mutationFn: async () => {
                const { error } = await supabase.auth.signOut()
                if (error) {
                        throw new Error(error.message)
                }
            },
            onSuccess: () => {
                router.push('/login')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })

        return (
                <header className="sticky border-b border-input top-0 z-50 bg-background center-xl py-5 flex items-center justify-between">
                        <Link 
                            href="/" 
                            className="font-bold text-2xl text-primary-purple"
                        >
                                IMUSLIM LITE
                        </Link>

                        {/* Desktop nav */}
                        <nav className="lg:block hidden">
                            <ul className="flex gap-12">
                                {navMenu.map((nav, i) => (
                                    <li key={i}>
                                        <Link href={nav.href}>
                                                {nav.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Mobile menu button */}
                        <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden mr-2"
                                onClick={() => setMobileMenuOpen((open) => !open)}
                                aria-label="Toggle menu"
                        >
                                {mobileMenuOpen ? <X /> : <Menu />}
                        </Button>

                        {/* Mobile nav menu */}
                        {mobileMenuOpen && (
                                <nav className="fixed top-0 left-0 w-full h-full bg-background/95 z-50 flex flex-col items-center justify-center lg:hidden transition-all">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-4 right-4"
                                            onClick={() => setMobileMenuOpen(false)}
                                            aria-label="Close menu"
                                        >
                                                <X />
                                        </Button>
                                        <ul className="flex flex-col gap-8 text-2xl">
                                                {navMenu.map((nav, i) => (
                                                        <li key={i}>
                                                                <Link
                                                                    href={nav.href}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                        {nav.name}
                                                                </Link>
                                                        </li>
                                                ))}
                                                <li>
                                                    {!session?.access_token ? (
                                                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                                    <Button variant="default" className="w-full">
                                                                            Sign In
                                                                    </Button>
                                                            </Link>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                    variant="secondary"
                                                                    className="w-full"
                                                                    onClick={() => {
                                                                        setMobileMenuOpen(false)
                                                                        mutate()
                                                                    }}
                                                            >
                                                                    {isPending && (
                                                                        <Loader2Icon className="animate-spin mr-2" />
                                                                    )}
                                                                    Logout
                                                            </Button>
                                                            <p className="font-bold mt-2">Hello, {session.user.username}</p>
                                                        </>
                                                    )}
                                                </li>
                                                <li>
                                                        <div className="flex gap-2 justify-center">
                                                                <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => setTheme("light")}
                                                                >
                                                                        <Sun />
                                                                </Button>
                                                                <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => setTheme("dark")}
                                                                >
                                                                        <Moon />
                                                                </Button>
                                                                <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => setTheme("system")}
                                                                >
                                                                        <Sun className="opacity-60" />
                                                                        <Moon className="absolute opacity-60" />
                                                                </Button>
                                                                <Link href="/saved-surah">
                                                                        <Button 
                                                                            variant="outline"
                                                                            size="icon"
                                                                        >
                                                                                <Bookmark />
                                                                        </Button>   
                                                                </Link>
                                                        </div>
                                                </li>
                                        </ul>
                                </nav>
                        )}

                        {/* Desktop right controls */}
                        <div className="items-center lg:flex hidden gap-2">
                                {!session?.access_token ? (
                                        <Link href="/login">
                                                <Button variant="default">
                                                        Sign In
                                                </Button>
                                        </Link>
                                ) : (
                                    <>
                                        <p className="font-bold">Hello, {session.user.username}</p>
                                        <Link href="/saved-surah">
                                            <Button 
                                                variant="ghost"
                                                size="icon"
                                            >
                                                    <Bookmark />
                                            </Button>
                                        </Link>
                                        <Button 
                                                variant="secondary"
                                                onClick={() => mutate()}
                                        >
                                                {isPending && (
                                                        <Loader2Icon className="animate-spin" />
                                                )}
                                                Logout
                                        </Button>
                                    </>
                                )}

                                <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                                </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                        Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                        Dark
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                                        System
                                                </DropdownMenuItem>
                                        </DropdownMenuContent>
                                </DropdownMenu>
                        </div>
                </header>
        )
}

const navMenu = [
        {
                href: "/",
                name: "Beranda"
        },
        {
                href: "/jadwal-sholat",
                name: "Jadwal Sholat"
        },
        {
                href: "/surah",
                name: "Surat Al-Qur'an"
        },
        {
                href: "/doa",
                name: "Do'a"
        },
]