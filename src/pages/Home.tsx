import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import Industries from '../components/sections/Industries';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';

interface HomeProps {
  preloaderDone?: boolean;
}

export default function Home({ preloaderDone = false }: HomeProps) {
  return (
    <>
      <Header />
      <main>
        <Hero preloaderDone={preloaderDone} />
        <About />
        <Team />
        <Industries />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
