import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const courses = [
  'Linear Algebra',
  'Single & Multivariable Calculus',
  'Classical Mechanics (Lagrangian)',
  'Electromagnetism',
  'Quantum Physics',
  'Evolution of Life',
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    const text = new SplitType(el, { types: 'words,chars' });
    const trigger = gsap.from(text.chars, {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
      opacity: 0.2,
      stagger: 0.1,
    });
    return () => {
      (trigger as gsap.core.Tween).scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className="min-h-screen py-24 relative" id="about">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="flex-1">
            <h3 className="section-label">01 // ABOUT</h3>
            <p ref={textRef} className="text-2xl md:text-3xl font-serif font-semibold leading-snug mb-8 text-white">
              Dedicated to understanding complex systems through the lens of Neural Networks, Deep Learning, and Intelligent Systems. Currently at IISER Pune pursuing a{' '}
              <span className="text-[var(--accent-gold)]">BS-MS Dual Degree</span>.
            </p>
            <p className="text-white/50 text-base font-light leading-relaxed">
              I believe the most interesting science lives at the intersection of disciplines — where physics meets biology, and computation meets cognition.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:w-5/12 w-full">

            {/* Photo / Avatar */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border border-[var(--accent-gold)]/40 animate-pulse"></div>
                <div className="absolute inset-[-8px] rounded-full border border-[var(--accent-gold)]/15"></div>
                {/* Photo container */}
                <div
                  className="w-full h-full rounded-full overflow-hidden border border-[var(--accent-gold)]/30 bg-[var(--glass)] backdrop-blur-md flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle at 40% 35%, rgba(245,166,35,0.12) 0%, rgba(3,3,3,0.8) 70%)' }}
                >
                  <img
                    src="/avatar.jpg"
                    alt="Satyamev Aman"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Placeholder shown when no image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                    <span className="text-5xl font-serif font-black text-[var(--accent-gold)]/60 tracking-widest">SA</span>
                    <span className="text-[9px] tracking-[4px] text-white/20 mt-2 uppercase">Photo</span>
                  </div>
                </div>
                {/* Decorative corner dot */}
                <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[var(--accent-gold)] shadow-[0_0_12px_var(--accent-gold)]"></div>
              </div>
            </div>

            <div className="mt-2">
              <h4 className="text-[var(--accent-gold)] text-xs tracking-[4px] uppercase mb-5">Key Courses</h4>
              <div className="flex flex-wrap gap-3">
                {courses.map((c, i) => (
                  <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs text-white/60 tracking-wider">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
