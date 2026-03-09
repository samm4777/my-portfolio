import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Grid fade in
      loadTl.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        loadTl.fromTo(headlineWords,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 },
          '-=0.3'
        );
      }

      // Subheadline
      loadTl.fromTo(subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      loadTl.fromTo(ctaRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
        '-=0.3'
      );

      // Portrait card
      loadTl.fromTo(portraitRef.current,
        { x: '18vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        '-=0.8'
      );

      // Label
      loadTl.fromTo(labelRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.5'
      );

      // Social links
      loadTl.fromTo(socialRef.current?.children || [],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 },
        '-=0.4'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, portraitRef.current, socialRef.current, labelRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(portraitRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '28vw', scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(socialRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(labelRef.current,
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
      className="section-pinned bg-[#070B0C] z-10"
    >
      {/* Grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-bg opacity-0"
      />

      {/* Content container */}
      <div className="relative w-full h-full">
        {/* Micro label */}
        <span
          ref={labelRef}
          className="absolute right-[7vw] top-[10vh] font-mono text-[11px] tracking-[0.12em] text-[#A8B0B3] uppercase opacity-0"
        >
          Based in Karachi — Available Worldwide
        </span>

        {/* Headline block */}
        <div
          ref={headlineRef}
          className="absolute left-[7vw] top-[18vh] w-[46vw]"
        >
          <h1 className="text-[clamp(44px,6vw,84px)] font-bold leading-[0.95] tracking-[-0.02em]">
            <span className="word inline-block">CRAFTING</span>
            <br />
            <span className="word inline-block text-[#B6FF2E]">DIGITAL</span>{' '}
            <span className="word inline-block">EXPERIENCES</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="absolute left-[7vw] top-[52vh] w-[34vw] text-[clamp(15px,1.2vw,18px)] text-[#A8B0B3] leading-[1.6] opacity-0"
        >
          Software engineer building fast, accessible, and expressive web products.
          Focused on DevOps, cloud infrastructure, and automation.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="absolute left-[7vw] top-[64vh] flex gap-4"
        >
          <a
            href="#work"
            className="btn-pill px-6 py-3 bg-[#B6FF2E] text-[#070B0C] font-medium text-sm flex items-center gap-2 hover:shadow-[0_0_30px_rgba(182,255,46,0.3)] transition-shadow duration-300"
          >
            View Work
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="btn-pill px-6 py-3 border border-[rgba(242,242,242,0.2)] text-[#F2F2F2] font-medium text-sm hover:border-[#B6FF2E] hover:text-[#B6FF2E] transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Portrait card */}
        <div
          ref={portraitRef}
          className="absolute right-[6vw] top-[14vh] w-[34vw] h-[72vh] card-rounded overflow-hidden border-hairline will-change-transform"
        >
          <img
            src="/hero-portrait.jpg"
            alt="Sameer Saleem"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B0C]/40 to-transparent" />
        </div>

        {/* Social links */}
        <div
          ref={socialRef}
          className="absolute left-[7vw] bottom-[10vh] flex flex-col gap-3"
        >
          <a
            href="https://github.com/samm4777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A8B0B3] hover:text-[#B6FF2E] transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-s-5b155820a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#A8B0B3] hover:text-[#B6FF2E] transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:sh.sameer2004@gmail.com"
            className="flex items-center gap-2 text-[#A8B0B3] hover:text-[#B6FF2E] transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}