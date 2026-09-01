import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './Leader.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});


const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);


import saurabhkumarImg from '../../assets/team/saurabhkumar.jpg';
// import saurabhkumarPdf from '../../assets/team/saurabhkumar.pdf';
import sanjaythommandruImg from '../../assets/team/sanjaythommandru.jpg';
// import sanjaythommandruPdf from '../../assets/team/sanjaythommandru.pdf';
import vinayakawasthiImg from '../../assets/team/vinayakawasthi.jpg';
// import vinayakawasthiPdf from '../../assets/team/vinayakawasthi.pdf';
import sharadshuklaImg from '../../assets/team/sharadshukla.jpg';
// import sharadshuklaPdf from '../../assets/team/sharadshukla.pdf';
import muskanmishraImg from '../../assets/team/muskanmishra.jpg';
// import muskanmishraPdf from '../../assets/team/muskanmishra.pdf';

const leaders = [
  { name: "Muskan Mishra",   role: "Joint Secretary", linkedin: "https://www.linkedin.com/in/muskan-mishra2205/", cv: "https://drive.google.com/file/d/1_8AFZJjO3bi2G25RzhKhhaeN72ro8UCx/view?usp=drive_link", image: muskanmishraImg },
  { name: "Vinayak Awasthi", role: " Co-Vice-Chair", linkedin: "https://www.linkedin.com/in/vinayakawasthi/", cv: "https://drive.google.com/drive/folders/1l6OmLPMQvbK16lxDVM52k2VToHwpgdcC", image: vinayakawasthiImg },
  { name: "Saurabh Kumar",   role: "Chair", linkedin: "https://www.linkedin.com/in/saurabh-kumar-8370003a/", cv: "https://www.researchgate.net/profile/Saurabh-Kumar-195", image: saurabhkumarImg },
  { name: "Sanjay Thommandru",          role: "Vice-Chair", linkedin: "https://www.linkedin.com/in/sanjay-thommandru-205862293/", cv: "https://drive.google.com/file/d/1ewsk0MeKYkZZVv3w9zIGAM3jDcW6Ex2y/view?usp=drive_link", image: sanjaythommandruImg },
  { name: "Sharad Shukla",   role: "Secretary", linkedin: "https://www.linkedin.com/in/sharad-shukla-66509832a/", cv: "https://drive.google.com/file/d/1bCaayTuDp7SRYYAc5TetXxGzNGbWg2Vq/view?usp=drive_link", image: sharadshuklaImg },
];

function Leader() {
  return (
  <section className={styles.section}>
    <div className={styles.header}>
      <span className={styles.eyebrow}>The People</span>
      <h2 className={styles.title}>Student Leadership</h2>
      <p className={styles.sharpText}>
        A small team running the chapter — organizing events, building initiatives, and keeping everything moving.
      </p>
    </div>

    <div className={styles.profileGrid}>
      {leaders.map((leader, i) => (
        <div
          key={i}
          className={styles.profileItem}
          style={{ willChange: 'transform, opacity' }}
          onMouseEnter={() => {
            popSound.stop();
            popSound.play();
          }}
        >
          <div className={styles.avatar}>
            {leader.image && <img src={leader.image} alt={leader.name} loading="lazy" />}
          </div>
          <span className={styles.name}>{leader.name}</span>
          <span className={styles.role}>{leader.role}</span>
          <div className={styles.btnGroup}>
            {leader.cv ? (
              <a
                href={leader.cv}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
                aria-label={`View ${leader.name}'s Resume`}
              >
                View Resume
              </a>
            ) : (
               <span className={styles.primaryBtnDisabled}>No Resume</span>
            )}

            {leader.linkedin && (
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
                aria-label={`View ${leader.name}'s LinkedIn Profile`}
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}

export default memo(Leader);

