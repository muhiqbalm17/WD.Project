import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Keunggulan from './components/Keunggulan';
import KatalogLayanan from './components/KatalogLayanan';
import Portofolio from './components/Portofolio';
import AlurKerja from './components/AlurKerja';
import FormRFQ from './components/FormRFQ';
import LokasiKontak from './components/LokasiKontak';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Keunggulan />
        <KatalogLayanan />
        <Portofolio />
        <AlurKerja />
        <FormRFQ />
        <LokasiKontak />
      </main>
      <Footer />
    </>
  );
}

