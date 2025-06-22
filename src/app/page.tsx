import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { Book, Calendar, Hand } from "lucide-react";
import Image from "next/image";

export default function PageHome() {
  return (
    <MainLayout
      containerSize="1200"
      withNavbar
    >
      <section className="h-[80vh] flex-col md:flex-row flex items-center justify-between gap-8">
        <div className="max-w-[420px]">
          <h1 className="text-5xl font-semibold">
            Heningkan Pikiran <span className="text-primary-purple">Hidupkan Iman</span>
          </h1>
          <p className="mt-3">
            Temukan Ketenangan dalam Jadwal Salat, Doa, dan Ayat Al-Qur’an
          </p>

          <Button className="mt-5">
            Mulai Sekarang
          </Button>
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

      <section className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-5">
          <div className="border p-5 flex flex-col items-center justify-center text-center rounded-xl bg-background">
            <div className="w-[50px] h-[50px] bg-secondary-purple dark:bg-primary-purple rounded-lg flex items-center justify-center">
              <Calendar />
            </div>

            <h3 className="font-bold text-2xl mt-4">
              Jadwal Salat
            </h3>
            <p>
              Lihat waktu salat akurat sesuai lokasi kamu, mulai dari subuh hingga isya
            </p>
          </div>
          <div className="border p-5 flex flex-col items-center justify-center text-center rounded-xl bg-background">
            <div className="w-[50px] h-[50px] bg-secondary-purple dark:bg-primary-purple rounded-lg flex items-center justify-center">
              <Book />
            </div>

            <h3 className="font-bold text-2xl mt-4">
              Surat Al-Qur&apos;an
            </h3>
            <p>
              Baca surat-surat pendek maupun panjang dari Al-Qur’an, kapan saja kamu butuh ketenangan.
            </p>
          </div>
          <div className="border p-5 flex flex-col items-center justify-center text-center rounded-xl bg-background">
            <div className="w-[50px] h-[50px] bg-secondary-purple dark:bg-primary-purple rounded-lg flex items-center justify-center">
              <Hand />
            </div>

            <h3 className="font-bold text-2xl mt-4">
              Doa Harian
            </h3>
            <p>
              Kumpulan doa harian dari bangun tidur hingga sebelum tidur, lengkap dengan artinya.
            </p>
          </div>
      </section>

      <section className="mt-12 md:mt-24">
        <div className="flex gap-8 md:gap-12 flex-col md:flex-row">
          <figure>
            <Image 
              src="/assets/sajadah.png"
              alt="sajadah"
              width={462.85}
              height={324}
            />
          </figure>

          <div className="space-y-5 max-w-[470px]">
            <h2 className="font-semibold text-2xl">
              Di Balik Kesibukan, Ada Momen yang Tak Boleh Terlewat
            </h2>

            <p>
              Waktu salat, dzikir, dan tilawah sering terlewat di tengah padatnya rutinitas. Kami hadir untuk membantumu tetap terhubung dengan-Nya, kapan pun dan di mana pun kamu berada.
            </p>

            <Button>
              Lihat Jadwal Salat Hari ini
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

