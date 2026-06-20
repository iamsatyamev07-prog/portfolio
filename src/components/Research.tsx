import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const projects = [
  {
    pi: 'PI: Prof. Raju Attada | IISER Mohali',
    period: 'March 2026 – Present (Hybrid)',
    title: 'Fine Tuning Aurora',
    desc: 'Working on fine-tuning Aurora, a foundational model for weather forecasting, while developing core ideas around Neural Networks and Deep Learning for geophysical data.',
    tags: ['Climate AI', 'Deep Learning', 'Geophysical Data', 'Scientific Data Handling'],
    img: 'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=2000',
    alt: 'Aurora weather model',
    reverse: false,
  },
  {
    pi: 'PI: Ravi Jambhekar | IISc Bengaluru',
    period: 'May 2026 – Present (On-site)',
    title: 'Mixed-Species Interaction',
    desc: 'Studying pattern dynamics in mixed-species butterfly mud-puddling behaviour. Independently developing an analogous framework for bio-inspired optimization algorithms and distributed AI systems.',
    tags: ['Bio-AI', 'Graph Neural Networks', 'Computer Vision', 'Time-Series Modelling', 'Behavioural Modelling'],
    img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=2000',
    alt: 'Butterfly biology',
    reverse: true,
  },
];

const workshop = {
  label: 'SELF PROJECT / EXTERNAL WORKSHOP',
  period: 'December 2025 – January 2026 | Online',
  title: 'Code To Cure Workshop',
  org: 'Sangyan',
  desc: 'A 3-week intensive certified workshop on molecular docking and bioinformatics. As part of a collaborative team, screened protein structures from the PDB, performed docking analyses, evaluated binding interactions, and carried out structural modifications and optimization.',
  tags: ['Molecular Docking', 'Bioinformatics', 'PyMol', 'Chimera', 'Cytoscape', 'Data Analysis'],
  img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2000',
  alt: 'Bioinformatics molecular docking',
};

export default function Research() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const img = card.querySelector('img');
      if (!img) return;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(img, { x: x * -0.05, y: y * -0.05, duration: 0.5, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(img, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      });
    });
  }, []);

  return (
    <section className="min-h-screen py-24" id="research">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label text-center">03 // RESEARCH & PROJECTS</h3>

        {projects.map((p, i) => (
          <div
            key={i}
            ref={el => (cardsRef.current[i] = el)}
            className={`project-card flex flex-col ${p.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-[50px] mb-[100px] p-10 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[20px] transition-transform duration-500 hover:-translate-y-2`}
          >
            <div className="flex-1 w-full">
              <span className="block text-xs text-[var(--accent-gold)] tracking-widest mb-1">{p.pi}</span>
              <span className="block text-xs text-white/40 tracking-widest mb-5">{p.period}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-5">{p.title}</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-3">
                {p.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 border border-white/20 rounded-full text-xs tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full h-[420px] overflow-hidden rounded-[10px]">
              <img src={p.img} alt={p.alt} className="w-full h-full object-cover transform scale-110" />
            </div>
          </div>
        ))}

        <div
          ref={el => (cardsRef.current[2] = el)}
          className="project-card flex flex-col lg:flex-row items-center gap-[50px] mb-[50px] p-10 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[20px] transition-transform duration-500 hover:-translate-y-2"
        >
          <div className="flex-1 w-full">
            <span className="block text-xs text-[var(--accent-gold)] tracking-widest mb-1">{workshop.label}</span>
            <span className="block text-xs text-white/40 tracking-widest mb-2">{workshop.period}</span>
            <span className="block text-xs text-white/30 tracking-widest mb-5">{workshop.org}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-5">{workshop.title}</h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">{workshop.desc}</p>
            <div className="flex flex-wrap gap-3">
              {workshop.tags.map(tag => (
                <span key={tag} className="px-4 py-2 border border-white/20 rounded-full text-xs tracking-wider">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full h-[420px] overflow-hidden rounded-[10px]">
            <img src={workshop.img} alt={workshop.alt} className="w-full h-full object-cover transform scale-110" />
          </div>
        </div>
      </div>
    </section>
  );
}
