import React, { useEffect, memo } from 'react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

import Mission from './Mission';
import Mentor from './Mentor';
import Leader from './Leader';
import Membership from './Membership';

gsap.registerPlugin(ScrollTrigger);

function About() {
  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.' + styles.section);

      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              fastScrollEnd: true
            }
          }
        );
      });
    });

    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, []);


  return (
    <div className={styles.aboutPage}>

      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: '40px', willChange: 'transform, opacity' }}>
        <h1 className="sr-only">About AMPP RGIPT</h1>
        <span className={styles.eyebrow}>Inside the Chapter</span>
        <h2 className={styles.title} style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
          AMPP–RGIPT
        </h2>
        <p className={styles.sharpText} style={{ margin: '0 auto', fontSize: '1.4rem' }}>
          A student-led community exploring materials, corrosion science, and engineering through practical learning, industry interaction, and collaborative projects.
        </p>
      </section>

      <Mission />
      <div className={styles.divider} />
      <Mentor />
      <div className={styles.divider} />
      <Leader />
      <div className={styles.divider} />
      <Membership />
    </div>
  );
}

export default memo(About);

