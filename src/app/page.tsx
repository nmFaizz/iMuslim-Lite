import ListSurah from "@/components/home/ListSurah";
import MainLayout from "@/layouts/MainLayout";

export default function PageHome() {
  return (
    <MainLayout
      containerSize="1200"
      withNavbar
    >
      <ListSurah />
    </MainLayout>
  );
}
