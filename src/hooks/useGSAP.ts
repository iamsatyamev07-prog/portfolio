import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  useEffect(() => {
    // any global gsap setup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}