import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Counter ticks 0 → 100
    const counterObj = { val: 0 };
    gsap.to(counterObj, {
      val: 100,
      duration: 2,
      ease: 'power4.inOut',
      onUpdate: () => setCounter(Math.round(counterObj.val)),
    });

    const tl = gsap.timeline();

    // Animate cycling words and progress bar in parallel
    if (wordsRef.current.length > 0) {
      tl.to(wordsRef.current, {
        opacity: 1,
        duration: 0.2,
        stagger: 0.2,
        repeat: 1,
        yoyo: true,
      }, 0);
    }

    if (progressRef.current) {
      tl.to(progressRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power4.inOut',
      }, 0);
    }

    // Always slide the loader away — hero title is independently visible
    tl.to(loaderRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut',
    });
  }, []);

  const words = ['RESEARCH', 'COMPUTE', 'ANALYZE', 'DISCOVER', 'SIMULATE'];

  return (
    <div ref={loaderRef} className="fixed w-full h-screen bg-black z-[9999] flex justify-center items-center">
      <div className="text-center w-[300px] relative">
        <div className="relative h-[40px] flex justify-center items-center overflow-hidden mb-4">
          {words.map((word, i) => (
            <span
              key={word}
              ref={(el) => { if (el) wordsRef.current[i] = el; }}
              className="absolute block text-2xl font-black tracking-[10px] opacity-0 text-white w-full text-center"
            >
              {word}
            </span>
          ))}
        </div>
        <div className="h-[1px] bg-white/10 mt-[50px] w-full relative">
          <div
            ref={progressRef}
            className="h-full w-0 bg-[var(--accent-gold)] shadow-[0_0_20px_var(--accent-gold)] absolute top-0 left-0"
          ></div>
        </div>
        <div className="mt-4 text-white font-mono text-sm tracking-widest opacity-60">
          {counter.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
