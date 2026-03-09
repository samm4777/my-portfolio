import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './index.css';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import IntroStatement from './sections/IntroStatement';
import SelectedWork from './sections/SelectedWork';
import Capabilities from './sections/Capabilities';
import FeaturedProject from './sections/FeaturedProject';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import CTABanner from './sections/CTABanner';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#070B0C] min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <IntroStatement />
        <SelectedWork />
        <Capabilities />
        <FeaturedProject />
        <Process />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
    </div>
  );
}

export default App;