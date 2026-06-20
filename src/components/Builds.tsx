import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Builds() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: textRef.current, start: 'top 85%', once: true },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <section className="py-24" id="builds" ref={sectionRef}>
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">05 // BUILDS</h3>

        <div className="mt-12 p-10 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[20px] hover:border-[var(--accent-gold)]/30 transition-colors duration-500">
          <p
            ref={textRef}
            className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-3xl"
          >
            Here you'll find some of my personal and collaborative projects that I work on as a hobby,
            primarily focused on{' '}
            <span className="text-[var(--accent-gold)]">Machine Learning</span> and{' '}
            <span className="text-[var(--accent-gold)]">Full-Stack Development</span>.
            I'm constantly building and learning, so check back for updates.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse"></div>
            <span className="text-white/30 text-xs tracking-[4px] uppercase">Projects coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
