import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './Mission.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

const missions = [
  {
    title: "Learn",
    text: "Explore materials science, corrosion engineering, and emerging technologies through workshops, discussions, and technical sessions."
  },
  {
    title: "Build",
    text: "Work on practical ideas, collaborative initiatives, and chapter projects that encourage problem-solving and technical growth."
  },
  {
    title: "Connect",
    text: "Engage with peers, mentors, researchers, and industry professionals to gain perspective beyond academics."
  }
];

function Mission() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Our Philosophy</span>
      <h2 className={styles.title}>How We Work</h2>
      <p className={styles.sharpText}>
        We focus on learning through experience, building practical understanding beyond classrooms, and creating opportunities that connect students with real engineering environments.
      </p>

      <div className={styles.cardGrid}>
        {missions.map((m, i) => (
          <div
            key={i}
            className={styles.featureCard}
            style={{ willChange: 'transform, opacity' }}
            onMouseEnter={() => {
              popSound.stop();
              popSound.play();
            }}
          >
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Mission);

