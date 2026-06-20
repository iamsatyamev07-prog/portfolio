import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const skillGroups = [
  {
    category: 'Programming',
    items: ['Python — Fluent', 'C++ — Fluent', 'Competitive Programming — Intermediate'],
  },
  {
    category: 'Research & Analytical',
    items: [
      'Scientific problem framing',
      'Reading & synthesising research papers',
      'Geophysical & biological data analysis',
      'Simulation & computational modelling',
    ],
  },
  {
    category: 'Domain Expertise',
    items: [
      'Climate AI & Weather Forecasting',
      'Computational Biology',
      'Graph Neural Networks',
      'Computer Vision',
      'Bio-inspired Algorithms',
      'Bioinformatics',
    ],
  },
];

export default function Skills() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <section className="py-24" id="skills">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">04 // SKILLS</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className="p-8 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[16px] flex flex-col gap-4 hover:border-[var(--accent-gold)]/40 transition-colors duration-500"
            >
              <h4 className="text-[var(--accent-gold)] text-xs tracking-[4px] uppercase font-medium border-b border-white/10 pb-3">
                {group.category}
              </h4>
              <ul className="flex flex-col gap-3">
                {group.items.map((item, j) => (
                  <li key={j} className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] mt-1 text-[10px]">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
