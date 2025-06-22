import JadwalSholat from "@/components/home/JadwalSholat"
import MainLayout from "@/layouts/MainLayout"

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