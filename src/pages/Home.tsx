import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Industries from '../components/sections/Industries';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Industries />
        <Services />
        <Contact />
      </main>
    </>
  );
}
