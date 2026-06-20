import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: '333', label: 'IAT 2025 Rank', sub: 'Integrated Aptitude Test' },
  { value: '98.6', label: 'JEE Mains Percentile', sub: '2025' },
  { value: '99.8', label: 'Board Percentile', sub: 'West Bengal Board 2025' },
  { value: '8.5', label: 'CGPA', sub: 'IISER Pune — 2nd Semester' },
];

const honors = [
  {
    title: 'DST-SHE INSPIRE Fellow',
    desc: 'Department of Science & Technology scholarship awarded to students in the top 1 percentile of their board examinations.',
  },
  {
    title: 'IAT 2025 — CRL 333',
    desc: 'All-India Rank 333 in the IISER Aptitude Test (IAT), leading to admission into the BS-MS programme at IISER Pune.',
  },
  {
    title: 'Table Tennis — IISM 2025',
    desc: 'Represented IISER Pune in the Inter IISER Sports Meet (IISM) 2025.',
  },
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.from('.stat-item', {
      scrollTrigger: { trigger: containerRef.current, start: 'top center' },
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
    });
    gsap.from('.honor-item', {
      scrollTrigger: { trigger: '.honor-item', start: 'top 85%' },
      x: -40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="py-24" ref={containerRef} id="achievements">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">05 // ACHIEVEMENTS</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mb-20">
          {stats.map((s, i) => (
            <div key={i} className="stat-item p-10">
              <h4 className="text-[3rem] font-serif font-black mb-1">{s.value}</h4>
              <span className="block text-white/60 tracking-widest text-sm uppercase">{s.label}</span>
              <span className="block text-white/30 text-xs mt-1 tracking-wider">{s.sub}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {honors.map((h, i) => (
            <div key={i} className="honor-item flex flex-col md:flex-row md:items-start gap-4 p-8 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[16px] hover:border-[var(--accent-gold)]/40 transition-colors duration-500">
              <span className="text-[var(--accent-gold)] text-xs tracking-[4px] uppercase font-medium min-w-[200px]">
                {h.title}
              </span>
              <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
