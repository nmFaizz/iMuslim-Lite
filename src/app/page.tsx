import JadwalSholat from "@/components/home/JadwalSholat";
import ListSurah from "@/components/home/ListSurah";
import RandomDoa from "@/components/home/RandomDoa";
import MainLayout from "@/layouts/MainLayout";

export default function PageHome() {
  return (
    <MainLayout
      containerSize="1200"
      withNavbar
    >
      <JadwalSholat />
      <RandomDoa />
      <ListSurah />
    </MainLayout>
  );
}

