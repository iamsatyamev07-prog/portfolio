import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const degrees = [
  {
    degree: 'BS-MS Dual Degree',
    institute: 'Indian Institute of Science Education and Research (IISER), Pune',
    year: 'Till 2nd Semester, May 2026',
    detail: 'Roll No. 20251197',
  },
  {
    degree: 'Senior Secondary (West Bengal Board)',
    institute: 'Ramakrishna Mission Narendrapur, West Bengal',
    year: '2025',
    detail: 'DST-SHE INSPIRE Fellow (Top 1 percentile)',
  },
  {
    degree: 'Secondary (West Bengal Board)',
    institute: 'Ramakrishna Mission Narendrapur, West Bengal',
    year: '2023',
    detail: '',
  },
];

export default function Education() {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen py-24" id="education">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">02 // EDUCATION</h3>

        <div className="flex flex-col gap-8 mt-12">
          {degrees.map((d, i) => (
            <div
              key={i}
              ref={el => (rowsRef.current[i] = el)}
              className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[16px] hover:border-[var(--accent-gold)]/40 transition-colors duration-500"
            >
              <div className="flex-1">
                <span className="block text-[var(--accent-gold)] text-xs tracking-[4px] uppercase mb-2">
                  {d.year}
                </span>
                <h4 className="text-2xl font-serif font-black mb-1">{d.degree}</h4>
                <p className="text-white/60 text-sm">{d.institute}</p>
                {d.detail && (
                  <p className="text-white/40 text-xs mt-1 tracking-wider">{d.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
