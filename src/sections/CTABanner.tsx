import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(line1Ref.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(line2Ref.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.06
      );

      scrollTl.fromTo(buttonRef.current,
        { y: 18, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo([line1Ref.current, line2Ref.current],
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(buttonRef.current,
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
      className="section-pinned bg-[#070B0C] z-[80]"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Huge centered text */}
        <div className="text-center mb-8">
          <div ref={line1Ref} className="overflow-hidden">
            <h2 className="text-[clamp(40px,7vw,100px)] font-bold tracking-[-0.02em] leading-[1]">
              GOT A <span className="text-[#B6FF2E]">PROJECT?</span>
            </h2>
          </div>
          <div ref={line2Ref} className="overflow-hidden mt-2">
            <h2 className="text-[clamp(40px,7vw,100px)] font-bold tracking-[-0.02em] leading-[1]">
              LET'S <span className="text-[#B6FF2E]">BUILD</span> IT.
            </h2>
          </div>
        </div>

        {/* CTA button */}
        <a
          ref={buttonRef}
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#B6FF2E] text-[#070B0C] font-semibold text-base btn-pill hover:shadow-[0_0_40px_rgba(182,255,46,0.4)] transition-shadow"
        >
          Start a conversation
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}