import React from 'react';
import Loader from './Loader';
import CustomCursor from './CustomCursor';
import Canvas3D from './Canvas3D';
import ParticleCursor from './ParticleCursor';
import Nav from './Nav';
import Hero from './Hero';
import About from './About';
import Education from './Education';
import Research from './Research';
import Skills from './Skills';
import Builds from './Builds';
import Hobbies from './Hobbies';
import Repository from './Repository';
import Contact from './Contact';
import { useGSAP } from '../hooks/useGSAP';
import { useLenis } from '../hooks/useLenis';

export default function Portfolio() {
  useGSAP();
  useLenis();

  return (
    <div className="relative w-full h-full">
      <Loader />
      <CustomCursor />
      <ParticleCursor />
      <Nav />
      <Canvas3D />

      <div className="w-full relative z-10" id="main">
        <Hero />
        <About />
        <Education />
        <Research />
        <Skills />
        <Builds />
        <Hobbies />
        <Repository />
        <Contact />
      </div>
    </div>
  );
}
