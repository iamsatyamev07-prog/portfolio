import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#skills' },
  { label: 'Builds', href: '#builds' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Repository', href: '#repository' },
  { label: 'Connect', href: '#contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('');

  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 1, delay: 3.2, ease: 'power3.out' });

    const handleScroll = () => {
      const sections = links.map(l => document.querySelector(l.href));
      let current = '';
      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120) current = '#' + sec.id;
      });
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] py-5"
      style={{ background: 'linear-gradient(to bottom, rgba(3,3,3,0.95) 0%, transparent 100%)', backdropFilter: 'blur(12px)' }}
    >
      <a
        href="#home"
        onClick={e => scrollTo(e, '#home')}
        className="font-serif font-black text-lg tracking-widest text-white/90 hover:text-[var(--accent-gold)] transition-colors duration-300"
      >
        SA
      </a>

      <ul className="hidden md:flex items-center gap-8">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className={`text-xs tracking-[3px] uppercase transition-colors duration-300 ${
                active === link.href
                  ? 'text-[var(--accent-gold)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
