"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Sun, Moon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Navbar() {
    const { setTheme } = useTheme() 

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data } = await supabase.auth.getSession()
            return data.session
        },
    })

    const router = useRouter()

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
            <Link href="/" className="font-semibold text-2xl">
                iMuslim Lite
            </Link>

            <div className="flex items-center">
                {!session ? (
                    <Link href="/login">
                        <Button variant="secondary">
                            Sign In
                        </Button>
                    </Link>
                ) : (
                    <Button 
                        variant="secondary"
                        onClick={() => mutate()}
                    >
                        {isPending && (
                            <Loader2Icon className="animate-spin" />
                        )}
                        Logout
                    </Button>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="ml-2">
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