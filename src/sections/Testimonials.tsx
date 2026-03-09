import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Zap, Shield, ThumbsUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Sameer turned a messy set of requirements into a calm, reliable system. His ability to break down complex problems and deliver clean solutions is exceptional.",
    author: 'Engineering Lead',
    company: 'WeTheDigital',
    metrics: [
      { label: 'Response time', value: '<2s', icon: Zap },
      { label: 'Uptime', value: '99.9%', icon: Shield },
      { label: 'Satisfaction', value: '4.8/5', icon: ThumbsUp },
    ],
  },
  {
    quote: "Clear communication, clean code, and fast iterations. Working with Sameer was a breeze—he understood our needs and delivered beyond expectations.",
    author: 'Project Collaborator',
    company: 'Iqra University',
    metrics: [
      { label: 'Code quality', value: 'A+', icon: Shield },
      { label: 'Delivery', value: 'On time', icon: Zap },
      { label: 'Reviews', value: '5/5', icon: ThumbsUp },
    ],
  },
];

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Extract numeric part
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const suffix = value.replace(numericMatch[0], '');

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: targetNum,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: function() {
            const current = this.targets()[0].val;
            if (targetNum % 1 !== 0) {
              setDisplayValue(current.toFixed(1) + suffix);
            } else {
              setDisplayValue(Math.round(current) + suffix);
            }
          }
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 20, opacity: 0 },
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
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 55%',
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
      id="testimonials"
      className="relative bg-[#070B0C] py-[10vh] z-[70]"
    >
      {/* Heading */}
      <div ref={headingRef} className="px-[7vw] mb-[6vh]">
        <h2 className="text-[clamp(34px,4.2vw,64px)] font-bold tracking-[-0.02em]">
          TESTI<span className="text-[#B6FF2E]">MONIALS</span>
        </h2>
      </div>

      {/* Testimonials grid */}
      <div className="px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={el => { cardsRef.current[index] = el; }}
            className="card-rounded border-hairline p-6 md:p-8 bg-[#0B1215]/50 backdrop-blur-sm"
          >
            <Quote className="w-8 h-8 text-[#B6FF2E]/30 mb-4" />
            
            <p className="text-[#F2F2F2] text-[clamp(15px,1.2vw,18px)] leading-[1.7] mb-6">
              "{testimonial.quote}"
            </p>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-sm">{testimonial.author}</p>
                <p className="text-[#A8B0B3] text-xs">{testimonial.company}</p>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="flex gap-4 pt-4 border-t border-[rgba(242,242,242,0.1)]">
              {testimonial.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-[#B6FF2E]" />
                  <div>
                    <p className="text-[#B6FF2E] font-mono text-sm font-medium">
                      <AnimatedNumber value={metric.value} />
                    </p>
                    <p className="text-[#A8B0B3] text-[10px] uppercase tracking-wider">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}