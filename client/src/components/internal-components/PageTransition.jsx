import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Howl } from 'howler';
import styles from './PageTransition.module.css';
import { getLenis } from '../../lib/useLenis';

const transitionSound = new Howl({
  src: ['/sounds/page-transition.mp3', '/sounds/page-transition.wav'],
  volume: 0.45,
  preload: true
});

const STRIP_COUNT = 10;

const PageTransition = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const stripRefs = useRef([]);
  const logoRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useImperativeHandle(ref, () => ({
    playTransition: async () => {
      setIsAnimating(true);

      transitionSound.stop();
      transitionSound.play();

      const lenis = getLenis();
      if (lenis) lenis.stop();

      const tl = gsap.timeline();

      gsap.set(stripRefs.current, { translateY: '-100%' });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, y: 20 });

      await tl.to(stripRefs.current, {
        translateY: '0%',
        duration: 0.6,
        ease: 'power4.inOut',
        stagger: {
          each: 0.03,
          from: 'center'
        }
      })
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      }, '-=0.3');

      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve();

          const exitTl = gsap.timeline();

          exitTl.to(logoRef.current, {
            opacity: 0,
            scale: 1.1,
            y: -20,
            duration: 0.3,
            ease: 'power3.in'
          })
          .to(stripRefs.current, {
            translateY: '100%',
            duration: 0.6,
            ease: 'power4.inOut',
            stagger: {
              each: 0.02,
              from: 'edges'
            }
          }, '-=0.1');

          await exitTl;
          setIsAnimating(false);

          if (lenis) lenis.start();

          gsap.set(stripRefs.current, { translateY: '-100%' });
        }, 150);
      });
    }
  }));

  return (
    <div className={`${styles.overlay} ${isAnimating ? styles.active : ''}`} ref={containerRef}>
      <div className={styles.stripsContainer}>
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={el => stripRefs.current[i] = el}
            className={styles.strip}
          />
        ))}
      </div>

      <div ref={logoRef} className={styles.logoBox}>
        <span className={styles.logoText}>AMPP</span>
        <span className={styles.logoSub}>Association for Materials Protection and Performance</span>
      </div>
    </div>
  );
});

export default PageTransition;
