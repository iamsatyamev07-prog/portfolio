import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const items = [
  {
    icon: '🏓',
    title: 'Table Tennis',
    desc: 'Represented IISER Pune at the Inter IISER Sports Meet (IISM) 2025.',
  },
  {
    icon: '📸',
    title: 'Travelling & Photography',
    desc: 'Enjoy exploring new places and capturing moments through photography.',
  },
  {
    icon: '⚡',
    title: 'Competitive Programming',
    desc: 'Regularly solve problems on LeetCode and Codeforces.',
  },
];

export default function Hobbies() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <section className="py-24" id="hobbies">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">06 // BEYOND RESEARCH</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {items.map((item, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className="p-10 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[20px] hover:border-[var(--accent-gold)]/40 transition-all duration-500 hover:-translate-y-1 flex flex-col gap-4"
            >
              <span className="text-4xl">{item.icon}</span>
              <h4 className="text-2xl font-serif font-black">{item.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
