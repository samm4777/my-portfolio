import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Form column
      gsap.fromTo(formRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Details column
      gsap.fromTo(detailsRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          }
        }
      );

      // Footer
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0B1215] py-[10vh] z-[90]"
    >
      <div className="px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form column */}
          <div ref={formRef}>
            <h2 className="text-[clamp(34px,4.2vw,64px)] font-bold tracking-[-0.02em] mb-3">
              CON<span className="text-[#B6FF2E]">TACT</span>
            </h2>
            <p className="text-[#A8B0B3] text-[clamp(14px,1.1vw,16px)] leading-[1.6] mb-8">
              Tell me what you're building. I'll reply within 1–2 business days.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#070B0C] border border-[rgba(242,242,242,0.1)] rounded-xl text-[#F2F2F2] text-sm focus:outline-none focus:border-[#B6FF2E] transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#070B0C] border border-[rgba(242,242,242,0.1)] rounded-xl text-[#F2F2F2] text-sm focus:outline-none focus:border-[#B6FF2E] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#070B0C] border border-[rgba(242,242,242,0.1)] rounded-xl text-[#F2F2F2] text-sm focus:outline-none focus:border-[#B6FF2E] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B6FF2E] text-[#070B0C] font-medium text-sm btn-pill hover:shadow-[0_0_30px_rgba(182,255,46,0.3)] transition-shadow"
              >
                {submitted ? 'Message sent!' : 'Send message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Details column */}
          <div ref={detailsRef} className="lg:pt-20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#B6FF2E]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:sh.sameer2004@gmail.com"
                    className="text-[#F2F2F2] hover:text-[#B6FF2E] transition-colors"
                  >
                    sh.sameer2004@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#B6FF2E]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-1">Location</p>
                  <p className="text-[#F2F2F2]">Karachi, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 text-[#B6FF2E]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-1">GitHub</p>
                  <a
                    href="https://github.com/samm4777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F2F2F2] hover:text-[#B6FF2E] transition-colors"
                  >
                    github.com/sameer
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B6FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-[#B6FF2E]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-[#A8B0B3] uppercase tracking-wider mb-1">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/sameer-s-5b155820a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F2F2F2] hover:text-[#B6FF2E] transition-colors"
                  >
                    linkedin.com/in/sameer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="px-[7vw] mt-16 pt-8 border-t border-[rgba(242,242,242,0.1)]">
        <p className="text-center text-[#A8B0B3] text-xs">
          © {new Date().getFullYear()} Sameer Saleem. Built with care.
        </p>
      </div>
    </section>
  );
}