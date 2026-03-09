import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, PenTool, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Understand the problem & constraints',
    description: 'Deep dive into requirements, user needs, and technical limitations.',
    icon: Lightbulb,
  },
  {
    number: '02',
    title: 'Design the system & interfaces',
    description: 'Architect solutions with clean patterns and intuitive UX.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Build, test, iterate, ship',
    description: 'Develop with precision, validate with testing, deploy with confidence.',
    icon: Rocket,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      scrollTl.fromTo(headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(imageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      const items = listRef.current?.querySelectorAll('.process-item');
      if (items) {
        scrollTl.fromTo(items,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
          0.16
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(headlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(listRef.current,
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
      id="process"
      className="section-pinned bg-[#070B0C] z-[60]"
    >
      <div className="relative w-full h-full">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="absolute left-[7vw] top-[18vh] w-[34vw]"
        >
          <h2 className="text-[clamp(34px,4.2vw,64px)] font-bold tracking-[-0.02em] mb-4">
            PRO<span className="text-[#B6FF2E]">CESS</span>
          </h2>
          <p className="text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.7]">
            I break complex problems into small, testable steps—then build with consistency.
            Every project follows a disciplined approach to deliver reliable, maintainable solutions.
          </p>
        </div>

        {/* Image card */}
        <div
          ref={imageRef}
          className="absolute right-[6vw] top-[14vh] w-[44vw] h-[62vh] card-rounded overflow-hidden border-hairline will-change-transform"
        >
          <img
            src="/process-workspace.jpg"
            alt="Development Process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B0C]/60 to-transparent" />
        </div>

        {/* Process list */}
        <div
          ref={listRef}
          className="absolute left-[7vw] bottom-[10vh] w-[40vw]"
        >
          <div className="space-y-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="process-item flex items-start gap-4 p-4 card-rounded bg-[#0B1215]/50 border-hairline"
              >
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-[#B6FF2E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#B6FF2E]">{step.number}</span>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-[#A8B0B3] text-xs leading-[1.6]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}