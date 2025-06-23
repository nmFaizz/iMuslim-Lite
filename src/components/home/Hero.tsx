"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/useSession";

export default function Hero() {
    const { session } = useSession();

    return (
        <section className="h-[80vh] flex-col md:flex-row flex items-center justify-between gap-8">
            <div className="max-w-[420px]">
                {session?.access_token ? (
                    <h1 className="text-5xl font-semibold">
                        Selamat Datang <span className="text-primary-purple">{session.user.username}</span>
                    </h1>
                ): (
                    <>
                        <h1 className="text-5xl font-semibold">
                            Heningkan Pikiran <span className="text-primary-purple">Hidupkan Iman</span>
                        </h1>
                        <p className="mt-3">
                            Temukan Ketenangan dalam Jadwal Salat, Doa, dan Ayat Al-Qur’an
                        </p>

                        <Link href="/login">
                            <Button className="mt-5">
                            Mulai Sekarang
                            </Button>
                        </Link>         
                    </>
                )}
            </div>

            <div>
                <Image 
                    src="/assets/mosque.png"
                    alt="Home Hero Image"
                    width={713}
                    height={517}
                />
            </div>
        </section>
    )
}