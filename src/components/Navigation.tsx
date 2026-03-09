import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="bg-[#070B0C]/80 backdrop-blur-md border-b border-[rgba(242,242,242,0.05)]">
          <div className="flex items-center justify-between px-[7vw] py-4">
            <a href="#" className="font-bold text-sm tracking-wider">
              SAMEER<span className="text-[#B6FF2E]">.</span>
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[rgba(242,242,242,0.2)] rounded-full text-xs font-mono uppercase tracking-wider hover:border-[#B6FF2E] hover:text-[#B6FF2E] transition-colors"
            >
              <Menu className="w-4 h-4" />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Logo (always visible on hero) */}
      <div
        className={`fixed top-6 left-[7vw] z-[100] transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <a href="#" className="font-bold text-sm tracking-wider">
          SAMEER<span className="text-[#B6FF2E]">.</span>
        </a>
      </div>

      {/* Menu button (always visible on hero) */}
      <div
        className={`fixed top-6 right-[7vw] z-[100] transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[rgba(242,242,242,0.2)] rounded-full text-xs font-mono uppercase tracking-wider hover:border-[#B6FF2E] hover:text-[#B6FF2E] transition-colors"
        >
          <Menu className="w-4 h-4" />
          Menu
        </button>
      </div>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-[#070B0C] transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Menu header */}
          <div className="flex items-center justify-between px-[7vw] py-6">
            <a href="#" className="font-bold text-sm tracking-wider">
              SAMEER<span className="text-[#B6FF2E]">.</span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 border border-[rgba(242,242,242,0.2)] rounded-full text-xs font-mono uppercase tracking-wider hover:border-[#B6FF2E] hover:text-[#B6FF2E] transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 flex flex-col items-center justify-center">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[clamp(32px,6vw,72px)] font-bold tracking-[-0.02em] py-3 hover:text-[#B6FF2E] transition-colors relative group"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease',
                }}
              >
                {item.label}
                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-[#B6FF2E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Menu footer */}
          <div className="px-[7vw] py-6 flex items-center justify-between text-xs text-[#A8B0B3]">
            <span>sh.sameer2004@gmail.com</span>
            <span>Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </>
  );
}