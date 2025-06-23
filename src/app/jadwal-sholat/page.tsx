import JadwalSholat from "@/app/jadwal-sholat/components/JadwalSholat"
import MainLayout from "@/layouts/MainLayout"

export const metadata = {
    title: "Jadwal Sholat",
    description: "Dapatkan jadwal sholat harian sesuai lokasi Anda.",
}

export default function JadwalSholatPage() {
    return (
        <MainLayout
            withNavbar
            containerSize="1200"
        >
            <JadwalSholat />
        </MainLayout>
    )
}