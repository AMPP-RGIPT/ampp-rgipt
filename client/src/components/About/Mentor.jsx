import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './Mentor.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

import deepakImg from '../../assets/mentor/deepakdwivedi.png';
import arvindImg from '../../assets/mentor/arvindsingh.png';

function Mentor() {

  return (
    <div className={styles.mentorContainer}>

      <section className={styles.section}>
        <div className={styles.textSide}>
          <span className={styles.eyebrow}>Faculty Advisor</span>
          <h2 className={styles.title}>Dr. Deepak Dwivedi</h2>
          <p className={styles.sharpText}>
                      <p className={styles.sharpText}>
            Dr. Deepak Dwivedi is an Assistant Professor at RGIPT's Department of Chemical and Biochemical Engineering. With a PhD from Curtin University (in collaboration with Cambridge and ANSTO, Australia), postdoctoral experience at the European Synchrotron Radiation Facility in Grenoble and prior recognition as a Research Scientist at Stanford University, his work bridges fundamental materials science with practical solutions for the energy and petrochemical industries. His research spans corrosion mitigation in pipelines, battery degradation, fuel cells, and advanced materials characterization using synchrotron and neutron techniques. He is the Assistant Dean for Research and Development at RGIPT, manages the Corrosion Engineering Laboratory, and serves on editorial boards of high-impact journals.
          </p>
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
              <img src={deepakImg} alt="Dr. Deepak Dwivedi" loading="lazy" />
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
              <img src={arvindImg} alt="Co-Faculty Advisor" loading="lazy" />
            </div>
          </div>

          <div className={styles.textSide}>
            <span className={styles.eyebrow}>Co-Faculty Advisor</span>
            <h2 className={styles.title}>Dr. Arvind Singh</h2>
                   <p className={styles.sharpText}>
              Dr. Arvind Singh is a faculty member in the Department of Chemical Engineering at Rajiv Gandhi Institute of Petroleum Technology (RGIPT), where he has been serving since January 2022. He completed his Ph.D. and M.Tech. from IIT (BHU), Varanasi, and his research areas include energy materials, hydrogen production, catalysis, and bioremediation, with a focus on the development and characterization of materials and processes for energy and environmental applications. He also serves as the Co-Advisor of the AMPP Student Chapter at RGIPT, where he mentors students and supports technical activities related to corrosion, materials protection, and professional development.
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

