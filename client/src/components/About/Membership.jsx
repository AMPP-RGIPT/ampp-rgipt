import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './Membership.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

const benefits = [
  {
    title: "Technical Learning",
    text: "Participate in workshops, sessions, and discussions focused on materials and corrosion engineering."
  },
  {
    title: "Industry Exposure",
    text: "Gain insight into industrial practices through expert talks, visits, and collaborative activities."
  },
  {
    title: "Project Experience",
    text: "Contribute to practical initiatives and technical projects that encourage problem-solving."
  },
  {
    title: "Professional Network",
    text: "Connect with students, mentors, researchers, and professionals from related engineering fields."
  },
  {
    title: "Team Collaboration",
    text: "Work with multidisciplinary teams while developing communication and leadership skills."
  },
  {
    title: "Chapter Activities",
    text: "Be involved in organizing events, technical sessions, outreach programs, and chapter initiatives."
  }
];

function Membership() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Opportunities</span>
      <h2 className={styles.title}>Why Join</h2>
      <p className={styles.sharpText}>
        AMPP-RGIPT creates a space where students can learn beyond coursework, collaborate with peers, and gain exposure to engineering practices in the real world.
      </p>

      <div className={styles.cardGrid}>
        {benefits.map((b, i) => (
          <div
            key={i}
            className={styles.benefitCard}
            style={{ willChange: 'transform, opacity' }}
            onMouseEnter={() => {
              popSound.stop();
              popSound.play();
            }}
          >
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaBanner} style={{ willChange: 'transform, opacity' }}>
        <h3>Be Part of the Chapter</h3>
        <p>
          Learn, collaborate, and contribute within a community focused on technical growth, practical exposure, and student-driven initiatives.
        </p>
        <a
          href="https://www.ampp.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          Register Now
        </a>
      </div>
    </section>
  );
}

export default memo(Membership);

