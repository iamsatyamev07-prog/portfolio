import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const roleTextRef = useRef<HTMLSpanElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const roleIdxRef = useRef(0);

  const roles = [
    'Welcome to My Portfolio',
    'Are You Here to Figure Out Who I Am?',
    'Hope This Site Explains Me',
    "Maybe I Don't Know You Yet, So Feel Free to Contact Me Anytime",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (roleIdxRef.current + 1) % roles.length;
      roleIdxRef.current = next;
      if (roleTextRef.current) {
        gsap.to(roleTextRef.current, {
          opacity: 0,
          y: -18,
          duration: 0.4,
          onComplete: () => {
            if (roleTextRef.current) {
              roleTextRef.current.innerText = roles[next];
              gsap.to(roleTextRef.current, { opacity: 1, y: 0, duration: 0.4 });
            }
          },
        });
      }
    }, 3000);

    if (heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center text-center relative py-24 overflow-hidden"
      id="home"
    >
      <div ref={heroContentRef} className="max-w-[1400px] mx-auto px-[5%] w-full will-change-transform">

        <h1 className="hero-title">
          Hey, it's Aman
        </h1>

        <div className="mt-6 flex justify-center items-center min-h-[2rem]">
          <span
            ref={roleTextRef}
            className="text-sm md:text-base font-light text-[var(--accent-gold)] tracking-wide max-w-xl"
          >
            Welcome to My Portfolio
          </span>
        </div>

        <p className="max-w-2xl mx-auto mt-6 text-white/80 text-lg md:text-xl font-light">
          Chasing the ideas that excite me most and keep me up late into the night.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#research"
            className="cta-btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Research
          </a>
          <a
            href="/cv.pdf"
            className="cta-btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>

      </div>
    </section>
  );
}
