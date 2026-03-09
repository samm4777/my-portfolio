import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Code2, Terminal, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: 'Languages',
    icon: Code2,
    skills: ['Java', 'Go', 'C++', 'SQL', 'HTML & CSS'],
  },
  {
    category: 'Systems & Tools',
    icon: Terminal,
    skills: ['Git', 'Linux', 'Docker (basics)', 'REST APIs', 'Concurrent systems'],
  },
  {
    category: 'Design & Collaboration',
    icon: Palette,
    skills: ['UI prototyping', 'Accessibility', 'Code reviews', 'Technical writing'],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            }
          }
        );

        // List items stagger
        const items = card.querySelectorAll('.skill-item');
        gsap.fromTo(items,
          { x: -12, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.03,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 50%',
              scrub: true,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#070B0C] py-[10vh] z-40"
    >
      {/* Heading */}
      <div ref={headingRef} className="px-[7vw] mb-[6vh]">
        <h2 className="text-[clamp(34px,4.2vw,64px)] font-bold tracking-[-0.02em] mb-3">
          CAPA<span className="text-[#B6FF2E]">BILITIES</span>
        </h2>
        <p className="text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.6] max-w-[44vw]">
          A practical stack built for real products—performance, clarity, and maintainability.
        </p>
      </div>

      {/* Skills grid */}
      <div className="px-[7vw] grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {skillsData.map((category, index) => (
          <div
            key={category.category}
            ref={el => { cardsRef.current[index] = el; }}
            className="card-rounded border-hairline p-6 md:p-8 bg-[#0B1215]/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center">
                <category.icon className="w-5 h-5 text-[#B6FF2E]" />
              </div>
              <h3 className="text-lg font-semibold">{category.category}</h3>
            </div>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="skill-item flex items-center gap-3 text-[#A8B0B3] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B6FF2E]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-[7vw]">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#B6FF2E] text-[#B6FF2E] text-sm font-medium btn-pill hover:bg-[#B6FF2E] hover:text-[#070B0C] transition-colors"
        >
          <Download className="w-4 h-4" />
          Download resume
        </a>
      </div>
    </section>
  );
}