import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(cardBRef.current,
        { x: '60vw', rotateZ: 6, opacity: 0 },
        { x: 0, rotateZ: 2, opacity: 1, ease: 'power2.out' },
        0.06
      );

      scrollTl.fromTo(cardARef.current,
        { x: '70vw', rotateZ: 10, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, ease: 'power3.out' },
        0.1
      );

      scrollTl.fromTo(indexRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(cardARef.current,
        { x: 0, y: 0, rotateZ: 0, opacity: 1 },
        { x: '-18vw', y: '-10vh', rotateZ: -6, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(cardBRef.current,
        { x: 0, y: 0, rotateZ: 2, opacity: 1 },
        { x: '-10vw', y: '-6vh', rotateZ: -3, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(headlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(indexRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pinned bg-[#070B0C] z-30"
    >
      <div className="relative w-full h-full">
        {/* Micro index */}
        <span
          ref={indexRef}
          className="absolute right-[7vw] top-[10vh] font-mono text-[12px] tracking-[0.12em] text-[#A8B0B3]"
        >
          01 / 02
        </span>

        {/* Headline block */}
        <div
          ref={headlineRef}
          className="absolute left-[7vw] top-[18vh] w-[34vw]"
        >
          <h2 className="text-[clamp(34px,4.2vw,64px)] font-bold tracking-[-0.02em] mb-4">
            SELECTED <span className="text-[#B6FF2E]">WORK</span>
          </h2>
          <p className="text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.6] mb-6">
            A few recent builds—systems, interfaces, and performance wins.
          </p>
          <a
            href="#featured"
            className="inline-flex items-center gap-2 text-[#B6FF2E] text-sm font-medium hover:gap-3 transition-all"
          >
            Explore all projects
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Card B (back) */}
        <div
          ref={cardBRef}
          className="absolute right-[9vw] top-[20vh] w-[44vw] h-[56vh] card-rounded overflow-hidden border-hairline will-change-transform z-[1]"
        >
          <img
            src="/project-hospital.jpg"
            alt="Hospital Management System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B0C] via-[#070B0C]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-xl font-semibold mb-1">Hospital Management System</h3>
            <p className="text-[#A8B0B3] text-sm font-mono">Java • DSA • Optimized scheduling</p>
          </div>
        </div>

        {/* Card A (front) */}
        <div
          ref={cardARef}
          className="absolute right-[6vw] top-[16vh] w-[44vw] h-[56vh] card-rounded overflow-hidden border-hairline will-change-transform z-[2] group cursor-pointer"
        >
          <img
            src="/project-airport.jpg"
            alt="Airport Management System"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B0C] via-[#070B0C]/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#B6FF2E] text-[#070B0C] text-xs font-mono font-medium rounded-full">
              FEATURED
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-semibold mb-1 group-hover:text-[#B6FF2E] transition-colors">Airport Management System</h3>
            <p className="text-[#A8B0B3] text-sm font-mono">Java • OOP • Real-time updates</p>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#B6FF2E] flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#070B0C]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}