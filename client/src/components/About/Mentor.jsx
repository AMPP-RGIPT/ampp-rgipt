import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './Mentor.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

// import deepakImg from '../../assets/mentor/dr.-deepak-dwivedi/deepakdwivedi.png';
// import arvindImg from '../../assets/mentor/dr.-arvind-signh/arvindsingh.png';

function Mentor() {

  return (
    <div className={styles.mentorContainer}>

      <section className={styles.section}>
        <div className={styles.textSide}>
          <span className={styles.eyebrow}>Faculty Advisor</span>
          <h2 className={styles.title}>Dr. Deepak Dwivedi</h2>
          <p className={styles.sharpText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <a
            href="https://sites.google.com/rgipt.ac.in/drdeepakdwivedicorrosionandsur/home"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileBtn}
          >
            View Profile
          </a>
        </div>

        <div className={styles.visualSide}>
            <div
              className={styles.avatarWrapper}
              style={{ willChange: 'transform, opacity' }}
              onMouseEnter={() => {
                popSound.stop();
                popSound.play();
              }}
            >
              <img src="" alt="Dr. Deepak Dwivedi" loading="lazy" />
            </div>
          </div>
        </section>

        <div className={styles.internalDivider} />

        {/* Co-Faculty Advisor Section (Asymmetric / Reversed) */}
        <section className={`${styles.section} ${styles.reverse}`}>
          <div className={styles.visualSide}>
            <div
              className={styles.avatarWrapper}
              style={{ willChange: 'transform, opacity' }}
              onMouseEnter={() => {
                popSound.stop();
                popSound.play();
              }}
            >
              <img src="" alt="Co-Faculty Advisor" loading="lazy" />
            </div>
          </div>

          <div className={styles.textSide}>
            <span className={styles.eyebrow}>Co-Faculty Advisor</span>
            <h2 className={styles.title}>Dr. Arvind Singh</h2>
            <p className={styles.sharpText}>
              Lorem Ipsum is simply dummy text of the
               printing and typesetting industry. Lorem Ipsu
               m has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into electronic
                 typesetting, remaining essentially unchanged. It was popularised in the
                  1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <a
              href="https://www.linkedin.com/in/arvind-singh-52942240/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.profileBtn}
            >
              View Profile
            </a>
          </div>
        </section>
      </div>
    );
  }

export default memo(Mentor);

