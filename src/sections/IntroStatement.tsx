import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

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
      const words = statementRef.current?.querySelectorAll('.word');
      if (words) {
        scrollTl.fromTo(words,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
          0
        );
      }

      scrollTl.fromTo(underlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(captionRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(statementRef.current,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(underlineRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(captionRef.current,
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
      className="section-pinned bg-[#070B0C] z-20"
    >
      <div className="relative w-full h-full flex items-center">
        {/* Statement */}
        <div
          ref={statementRef}
          className="absolute left-[7vw] top-1/2 -translate-y-1/2 w-[86vw]"
        >
          <h2 className="text-[clamp(34px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.02em]">
            <span className="word inline-block">I</span>{' '}
            <span className="word inline-block text-[#B6FF2E]">ENGINEER</span>{' '}
            <span className="word inline-block">THE</span>{' '}
            <span className="word inline-block">WEB</span>
            <br />
            <span className="word inline-block">TO</span>{' '}
            <span className="word inline-block">BE</span>{' '}
            <span className="word inline-block text-[#B6FF2E]">FAST,</span>{' '}
            <span className="word inline-block text-[#B6FF2E]">CLEAR,</span>{' '}
            <span className="word inline-block">AND</span>{' '}
            <span className="word inline-block text-[#B6FF2E]">HUMAN.</span>
          </h2>
        </div>

        {/* Accent underline */}
        <div
          ref={underlineRef}
          className="absolute left-[7vw] bottom-[18vh] w-[18vw] h-[2px] bg-[#B6FF2E]/70 origin-left"
        />

        {/* Caption */}
        <p
          ref={captionRef}
          className="absolute left-[7vw] bottom-[10vh] w-[28vw] text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.6]"
        >
          Clean systems. Thoughtful interactions. Design that respects the user.
        </p>
      </div>
    </section>
  );
}