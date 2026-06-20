import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const docs = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    label: 'Curriculum Vitae',
    sublabel: 'Full academic CV — research, education, achievements',
    status: 'coming-soon',
    filename: 'satyamev_aman_cv.pdf',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
      </svg>
    ),
    label: 'Resume',
    sublabel: 'One-page concise resume for research applications',
    status: 'coming-soon',
    filename: 'satyamev_aman_resume.pdf',
  },
];

export default function Repository() {
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
    <section className="py-24" id="repository">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <h3 className="section-label">07 // MY REPOSITORY</h3>
        <p className="text-white/40 text-sm tracking-widest mb-12 mt-2">
          Documents will be available for download here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {docs.map((doc, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className="relative p-8 bg-[var(--glass)] backdrop-blur-[20px] border border-white/10 rounded-[20px] flex flex-col gap-5 hover:border-[var(--accent-gold)]/40 transition-all duration-500 group"
            >
              <div className="text-[var(--accent-gold)]">{doc.icon}</div>

              <div>
                <h4 className="text-xl font-serif font-black mb-1">{doc.label}</h4>
                <p className="text-white/40 text-xs tracking-wider leading-relaxed">{doc.sublabel}</p>
              </div>

              <div className="mt-auto">
                {doc.status === 'coming-soon' ? (
                  <span className="inline-flex items-center gap-2 text-xs tracking-[3px] uppercase text-white/30 border border-white/10 rounded-full px-4 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block"></span>
                    Uploading soon
                  </span>
                ) : (
                  <a
                    href={`/${doc.filename}`}
                    download
                    className="inline-flex items-center gap-2 text-xs tracking-[3px] uppercase text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 rounded-full px-4 py-2 hover:bg-[var(--accent-gold)] hover:text-black transition-all duration-300"
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
