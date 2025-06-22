import { Book, Calendar, Hand } from "lucide-react";

export const mainFeatures = [
    {
        title: "Jadwal Salat",
        description: "Lihat waktu salat akurat sesuai lokasi kamu, mulai dari subuh hingga isya",
        icon: <Calendar />
    },
    {
        title: "Surat Al-Qur'an",
        description: "Baca surat-surat pendek maupun panjang dari Al-Qur’an, kapan saja kamu butuh ketenangan.",
        icon: <Book />
    },
    {
        title: "Doa Harian",
        description: "Kumpulan doa harian dari bangun tidur hingga sebelum tidur, lengkap dengan artinya.",
        icon: <Hand />
    },
]

export const cta = [
    {
        title: "Di Balik Kesibukan, Ada Momen yang Tak Boleh Terlewat",
        description: "Waktu salat, dzikir, dan tilawah sering terlewat di tengah padatnya rutinitas. Kami hadir untuk membantumu tetap terhubung dengan-Nya, kapan pun dan di mana pun kamu berada.",
        button: {
            text: "Lihat Jadwal Salat Hari ini",
            href: "/jadwal-salat",
        },
        image: {
            src: "/assets/sajadah.png",
            alt: "sajadah",
            width: 462.85,
            height: 324,
        }
    },
    {
        title: "Tilawah Lebih Mudah Kapan Saja, di Mana Saja",
        description: "Membaca Al-Qur’an kini bisa dilakukan lebih fleksibel. Akses berbagai surat, mulai dari yang pendek seperti Al-Falaq hingga yang lebih panjang seperti Al-Baqarah. Dengan fitur bookmark dan mode malam, membaca jadi lebih nyaman.",
        button: {
            text: "Buka Surat Hari Ini",
            href: "/surah",
        },
        image: {
            src: "/assets/quran.png",
            alt: "quran",
            width: 462.85,
            height: 324,
        }
    },
    {
        title: "Kekuatan Doa di Setiap Momen Hidupmu",
        description: "Tak perlu menunggu waktu-waktu tertentu untuk berdoa. Dalam setiap aktivitas harian—bangun tidur, sebelum bekerja, saat cemas, hingga menjelang tidur—ada doa yang bisa membimbingmu lebih dekat dengan-Nya. Kami merangkumnya agar lebih mudah kamu baca dan amalkan.",
        button: {
            text: "Lihat Kumpulan Doa Harian",
            href: "/doa",
        },
        image: {
            src: "/assets/doa.png",
            alt: "doa",
            width: 462.85,
            height: 324,
        }
    },
]