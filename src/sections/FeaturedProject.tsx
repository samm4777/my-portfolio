import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Plane } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(mediaRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(badgeRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0.14
      );

      const words = textRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(words,
          { x: '30vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.01, ease: 'power2.out' },
          0.1
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(mediaRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(textRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="section-pinned bg-[#070B0C] z-50"
    >
      <div className="relative w-full h-full">
        {/* Media card */}
        <div
          ref={mediaRef}
          className="absolute left-[7vw] top-[16vh] w-[44vw] h-[56vh] card-rounded overflow-hidden border-hairline will-change-transform"
        >
          <img
            src="/project-airport.jpg"
            alt="Airport Management System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B0C]/60 to-transparent" />
          
          {/* Badge */}
          <span
            ref={badgeRef}
            className="absolute top-4 left-4 px-3 py-1 bg-[#B6FF2E] text-[#070B0C] text-xs font-mono font-medium rounded-full"
          >
            FEATURED
          </span>
        </div>

        {/* Text block */}
        <div
          ref={textRef}
          className="absolute left-[56vw] top-[22vh] w-[37vw]"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-[#B6FF2E]" />
            </div>
            <span className="font-mono text-xs text-[#A8B0B3] tracking-[0.12em] uppercase">Case Study</span>
          </div>
          
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.02em] mb-4">
            <span className="word inline-block">Airport</span>{' '}
            <span className="word inline-block">Management</span>{' '}
            <span className="word inline-block text-[#B6FF2E]">System</span>
          </h2>
          
          <p className="text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.7] mb-6">
            A real-time, object-oriented system for flights, passengers, and staff—built for clarity and scale. 
            Features include flight scheduling, passenger check-in, baggage tracking, and staff management with 
            real-time updates and optimized data structures.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {['Java', 'OOP', 'Console + GUI-ready', 'Real-time'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#0B1215] border border-[rgba(242,242,242,0.1)] rounded-full text-xs font-mono text-[#A8B0B3]"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B6FF2E] text-[#070B0C] text-sm font-medium btn-pill hover:shadow-[0_0_30px_rgba(182,255,46,0.3)] transition-shadow"
          >
            Read case study
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}