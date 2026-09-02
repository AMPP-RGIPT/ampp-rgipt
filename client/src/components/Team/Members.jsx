import React, { useEffect, useRef, memo } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import styles from './Members.module.css';

const teamsHoverSound = new Howl({
  src: ['/sounds/teamsHover.wav'],
  volume: 0.4,
  preload: true
});

import saurabhkumarImg from '../../assets/team/saurabhkumar.jpg';
import sanjaythommandruImg from '../../assets/team/sanjaythommandru.jpg';
import vinayakawasthiImg from '../../assets/team/vinayakawasthi.jpg';
import sharadshuklaImg from '../../assets/team/sharadshukla.jpg';
import muskanmishraImg from '../../assets/team/muskanmishra.jpg';
import siddharthatalImg from '../../assets/team/siddharthatal.jpg';
import swatichaudharyImg from '../../assets/team/swatichaudhary.jpg';
import shubhamkrguptaImg from '../../assets/team/shubhamkrgupta.jpg';
import yashtripathiImg from '../../assets/team/yashtripathi.jpg';
import nikhilshuklaImg from '../../assets/team/nikhilshukla.jpg';
import shivamrajImg from '../../assets/team/shivamraj.jpg';
import mohdyawarImg from '../../assets/team/mohdyawar.jpg';
import pawanchaudharyImg from '../../assets/team/pawanchaudhary.jpg';
import anupyadavImg from '../../assets/team/anupyadav.jpeg';
import sandeephuddaImg from '../../assets/team/sandeephudda.jpg';
import rudrakshchamoliImg from '../../assets/team/rudrakshchamoli.jpg';
import omikasinghImg from '../../assets/team/omikasingh.JPG';
import ananyadasImg from '../../assets/team/ananyadas.jpg';
import prabhujeeImg from '../../assets/team/prabhujee.jpg';
import tanishkaImg from '../../assets/team/tanishka.jpg';
import anubhavchaudharyImg from '../../assets/team/anubhavchaudhary.jpg';
import shubhendrasinghImg from '../../assets/team/shubhendrasingh.jpg';
import gauravsrivastavaImg from '../../assets/team/gauravsrivastava.jpg';
import deeptitomarImg from '../../assets/team/deeptitomar.jpg';
import bhumikeshariImg from '../../assets/team/bhumikeshari.jpg';
import divishatiwariImg from '../../assets/team/divishatiwari.jpg';
import tanmaydohareImg from '../../assets/team/tanmaydohare.jpg';
import ojaspandeyImg from '../../assets/team/ojaspandey.jpg';
import ankitkumaranjanImg from '../../assets/team/ankitkumaranjan.jpg';
import nandinisharmaImg from '../../assets/team/nandinisharma.jpg';


gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: 'leadership',
    label: null,
    rows: [
      { role: 'Chair', name: 'Saurabh Kumar', linkedin: 'https://www.linkedin.com/in/saurabh-kumar-8370003a/', cv: 'https://www.researchgate.net/profile/Saurabh-Kumar-195', bio: '', image: saurabhkumarImg },
      { role: 'Vice Chair', name: 'Sanjay Thommandru', linkedin: 'https://www.linkedin.com/in/sanjay-thommandru-205862293/', cv: 'https://drive.google.com/file/d/1ewsk0MeKYkZZVv3w9zIGAM3jDcW6Ex2y/view?usp=drive_link', bio: '', image: sanjaythommandruImg },
      { role: 'Co-Vice Chair', name: 'Vinayak Awasthi', linkedin: 'https://www.linkedin.com/in/vinayakawasthi/', cv: 'https://drive.google.com/file/d/1IWYxh4As5SepLnRSzzaEsZkQOy-PjLjx/view?usp=drive_link', bio: '', image: vinayakawasthiImg },
      { role: 'Secretary', name: 'Sharad Shukla', linkedin: 'https://www.linkedin.com/in/sharad-shukla-66509832a/', cv: 'https://drive.google.com/file/d/1bCaayTuDp7SRYYAc5TetXxGzNGbWg2Vq/view?usp=drive_link', bio: '', image: sharadshuklaImg },
      { role: 'Joint Secretary', name: 'Muskan Mishra', linkedin: 'https://www.linkedin.com/in/muskan-mishra2205/', cv: 'https://drive.google.com/file/d/1_8AFZJjO3bi2G25RzhKhhaeN72ro8UCx/view?usp=drive_link', bio: '', image: muskanmishraImg },
      { role: 'Financial Liaison', name: 'Siddharth Atal', linkedin: 'https://www.linkedin.com/in/siddharth-atal/', cv: 'https://www.researchgate.net/profile/Siddharth-Atal', bio: '', image: siddharthatalImg },
      { role: 'Deputy Financial Liaison', name: 'Swati Chaudhary', linkedin: 'https://www.linkedin.com/in/swati-chaudhary-9340911a5/', cv: 'https://www.researchgate.net/profile/Swati-Chaudhary-19', bio: '', image: swatichaudharyImg },
    ],
  },

  {
    id: 'events',
    label: 'Events',
    rows: [
      { role: 'Chair', name: 'Shubham kr Gupta', linkedin: 'https://www.linkedin.com/in/shubham-gupta-969367289/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BwO44aocUQM2Qk2u631iEdw%3D%3D', cv: 'https://drive.google.com/file/d/1ZT9W1rwpVQhIQ_gybTzYtLxN0IbgGqma/view?usp=sharing', bio: '', image: shubhamkrguptaImg },
      { role: 'Head', name: 'Yash Tripathi', linkedin: 'https://www.linkedin.com/in/yash-tripathi-bb8667332/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BkKqWgf71RBGdFeznJVVCqw%3D%3D', cv: 'https://drive.google.com/file/d/1eMO8RBcuDtwTuyCIbXR41wHQdJUxSNQZ/view?usp=sharing', bio: '', image: yashtripathiImg },
      { role: 'Head', name: 'Nikhil Shukla', linkedin: 'https://www.linkedin.com/in/nikhil-shukla-926926351/', cv: 'https://drive.google.com/file/d/1tKpDCaSnWKhAcgxhsXxuHZ7XARjdG9-q/view?usp=drive_link', bio: '', image: nikhilshuklaImg },
    ],
  },
  {
    id: 'membership',
    label: 'Membership',
    rows: [
      { role: 'Chair', name: 'Shivam Raj', linkedin: 'https://www.linkedin.com/in/shivam-raj-b33a85299/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BSoxH7qjXQV2afwQ3zrCvOg%3D%3D', cv: 'https://drive.google.com/file/d/1nrtnC04FQuXBTrPxLu_se0042A90R8Vb/view?usp=drive_link', bio: '', image: shivamrajImg },
      { role: 'Head', name: 'Mohd Yawar', linkedin: 'https://www.linkedin.com/in/mohd-yawar-7662ab327/', cv: 'https://drive.google.com/file/d/1rQ2jNax0_KBxgHNSbVaHC-eEJ0k3rz88/view?usp=drive_link', bio: '', image: mohdyawarImg },
      { role: 'Head', name: 'Pawan Chaudhary', linkedin: 'https://in.linkedin.com/in/pawan-chaudhary-347430329', cv: 'https://drive.google.com/file/d/1m6dY5sJ0NsCCryYUFjNXntmxBOOgWROh/view?usp=drive_link', bio: '', image: pawanchaudharyImg },
    ],
  },

  {
    id: 'technical',
    label: 'Technical',
    rows: [
      { role: 'Chair', name: 'Anup Yadav', linkedin: 'https://www.linkedin.com/in/anupyadavv/', cv: 'https://drive.google.com/file/d/1E4nv4byQvfKdP9HKHvMzgt_Ufh0VZfLI/view?usp=drivesdk', bio: '', image: anupyadavImg },
      { role: 'Head', name: 'Sandeep Hudda', linkedin: 'https://www.linkedin.com/in/sandeep-hudda-022002329/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BHVqRssm6ScGWDoKRDTQeMA%3D%3D', cv: 'https://drive.google.com/file/d/1oJ3b42h0MmcZeKx81beiQZ9pWef77p7G/view?usp=drive_link', bio: '', image: sandeephuddaImg },
      { role: 'Head', name: 'Rudraksh Chamoli', linkedin: 'https://www.linkedin.com/in/rudraksh-chamoli/', cv: 'https://drive.google.com/file/d/1HRIMviU29SJBSrmgrsnS3BQZq496E8JL/view?usp=drive_link', bio: '', image: rudrakshchamoliImg },
    ],
  },
  {
    id: 'designing',
    label: 'Designing',
    rows: [
      { role: 'Head', name: 'Omika Singh', linkedin: 'https://www.linkedin.com/in/omikasingh/', cv: 'https://drive.google.com/file/d/1DEwoE8VVGpgo6hpNhTmKisnIxVIB2IlL/view?usp=sharing', bio: '', image: omikasinghImg },
      { role: 'Head', name: 'Ananya Das', linkedin: 'https://www.linkedin.com/in/ananya-das-012678323/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3B2GUK0tFsS2KO2mKN0PrnAw%3D%3D', cv: 'https://drive.google.com/file/d/1-L4_0JQLuIIl6ScZTn7BgHh3fqwH9UOm/view?usp=drive_link', bio: '', image: ananyadasImg },
    ],
  },

  {
    id: 'outreach',
    label: 'Outreach',
    rows: [
      { role: 'Head', name: 'Prabhu Jee', linkedin: 'https://www.linkedin.com/in/prabhu-jee-1707b7307/?skipRedirect=true', cv: 'https://drive.google.com/file/d/1hVuYo_6xvoPU4AhOAVY33xCoGjgdNnSo/view?usp=drive_link', bio: '', image: prabhujeeImg },
      { role: 'Head', name: 'Tanishka', linkedin: 'https://www.linkedin.com/in/tanishka-singh-8ab25632b/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BidUOTaftQASkGR3jt30JPw%3D%3D', cv: 'https://drive.google.com/file/d/1G07ScqQJBDKyhGmBL30OthBTljUvovvC/view', bio: '', image: tanishkaImg },

    ],
  },
  {
    id: 'engagement',
    label: 'Public Engagement',
    rows: [
      { role: 'Head', name: 'Anubhav Chaudhary', linkedin: 'https://www.linkedin.com/in/anubhav-chaudhary-2653a6329/', cv: 'https://drive.google.com/file/d/1nxSrfk-2iYGfYYU8Xy0L0TA9N8zsFC5k/view?usp=drive_link', bio: '', image: anubhavchaudharyImg },
      { role: 'Head', name: 'Shubhendra Singh', linkedin: 'https://www.linkedin.com/in/shubhendra-singh-2a7baa327/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BVCthkGPtTc%2B77VSAPOnlVg%3D%3D', cv: 'https://drive.google.com/file/d/1N0Yg3hb41_Xr13uiyMQO674buS4noj5o/view?usp=drive_link', bio: '', image: shubhendrasinghImg },
    ],
  },
  {
    id: 'innovation',
    label: 'Interaction & Innovation',
    rows: [
      { role: 'Head', name: 'Gaurav Srivastava', linkedin: 'https://www.linkedin.com/in/gaurav-srivastava-0509bb304/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3B6VbpXyOaQSK5Y9L43%2FlgUw%3D%3D', cv: 'https://drive.google.com/file/d/1C7NWmejzLTGIwRhZTue7goH0wU6qDz-Z/view?usp=drive_link', bio: '', image: gauravsrivastavaImg },
      { role: 'Head', name: 'Deepti Tomar', linkedin: 'https://www.linkedin.com/in/deepti-tomar-790989360/', cv: 'https://drive.google.com/file/d/1_zsDo6tg11FopedjC28iMSydBP2IkQDp/view', bio: '', image: deeptitomarImg },
      { role: 'Head', name: 'Bhumi Keshari', linkedin: 'https://www.linkedin.com/in/bhumi-keshari-08b336355/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BqOor71huSia4SWjZhzbE9Q%3D%3D', cv: 'https://drive.google.com/file/d/1q40q1CBlBpxb3q2y5T_EEJYSk5fQ8aYf/view?usp=drive_link', bio: '', image: bhumikeshariImg },
    ],
  },
  {
    id: 'editorial',
    label: 'Editorial',
    rows: [
      { role: 'Head', name: 'Divisha Tiwari', linkedin: 'https://www.linkedin.com/in/divisha-tiwari-10b738322/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BbkhLrEzpRCOITqQ1A5webw%3D%3D', cv: 'https://drive.google.com/file/d/1Cjmy6FnyeWY-svqqMKoJOdSOpOiwvEG_/view?usp=drive_link', bio: '', image: divishatiwariImg },
      { role: 'Head', name: 'Tanmay Dohare', linkedin: 'https://www.linkedin.com/in/tanmay-dohare-3381b8317/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3B47zYOQ2WRIKzaatAg2UGLg%3D%3D', cv: 'https://drive.google.com/file/d/1cRtGiRSYHTgp63fgKWHLyvyWbMBj3Oxr/view?usp=drive_link', bio: '', image: tanmaydohareImg },
    ],
  },
  {
    id: 'proposal',
    label: 'Proposal',
    rows: [
      { role: 'Head', name: 'Ojas Pandey', linkedin: 'https://www.linkedin.com/in/ojas-pandey-7b4b012a5/', cv: 'https://drive.google.com/file/d/1-VH3RFh88fih6XaJB9JOY98WljChQVl3/view?usp=drive_link', bio: '', image: ojaspandeyImg },
      { role: 'Head', name: 'Ankit Kumar Anjan', linkedin: 'https://www.linkedin.com/in/ankit-kumar-anjan-83a833342/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BpAj034XJQwqIk9NegIzKog%3D%3D', cv: 'https://docs.google.com/document/d/1zY30M4vxCkQlD7yoNUOMwXzHtipwhX9E/edit?usp=drive_link&ouid=108271838164879739129&rtpof=true&sd=true', bio: '', image: ankitkumaranjanImg },
      { role: 'Head', name: 'Nandini Sharma', linkedin: 'https://www.linkedin.com/in/nandini-sharma-15a156325/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_people%3BYTZCsw9nSGWVjYz0QkHMKA%3D%3D', cv: '', bio: '', image: nandinisharmaImg },
    ],
  },
];

const Row = memo(function Row({ row, rowRef }) {
  return (
    <div
      ref={rowRef}
      className={styles.row}
      style={{ willChange: 'background' }}
      onMouseEnter={() => {
        teamsHoverSound.stop();
        teamsHoverSound.play();
      }}
    >

      <div className={styles.mobileThumb}>
        {row.image
          ? <img src={row.image} alt={row.name} className={styles.mobileThumbImg} loading="lazy" />
          : <span className={styles.mobileThumbInitial}>{row.name.charAt(0)}</span>
        }
      </div>

      <span className={styles.roleText}>{row.role}</span>

      <div className={styles.imageBox} style={{ willChange: 'transform, opacity' }}>
        {row.image && <img src={row.image} alt={row.name} className={styles.hoverImage} loading="lazy" />}
      </div>

      <div className={styles.nameWrapper}>
        <span className={styles.nameText}>{row.name}</span>
        <div className={styles.linksWrapper}>
          {row.cv && (
            <a href={row.cv} target="_blank" rel="noopener noreferrer" className={styles.cvLink} aria-label="View Resume">
              Resume ↗
            </a>
          )}
          {row.linkedin && (
            <a href={row.linkedin} target="_blank" rel="noopener noreferrer" className={styles.knowMoreHint} aria-label="View LinkedIn Profile">
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>

      <span className={styles.hoverFill} aria-hidden="true" />
    </div>
  );
});


const Section = memo(function Section({ section, globalIndex }) {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const label = sectionRef.current?.querySelector(`.${styles.sectionLabel}`);
      if (label) {
        gsap.fromTo(label,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.45, ease: 'power4.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 92%',
              toggleActions: 'play none none none',
              fastScrollEnd: true
            }
          }
        );
      }

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.4, ease: 'power4.out',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 93%',
              toggleActions: 'play none none none',
              fastScrollEnd: true
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.section}>
      {section.label && (
        <div className={styles.sectionLabelRow}>
          <span className={styles.sectionLabel}>{section.label}</span>
        </div>
      )}
      {section.rows.map((row, i) => (
        <Row
          key={i}
          row={row}
          rowRef={el => rowRefs.current[i] = el}
        />
      ))}
    </div>
  );
});


export default function Members() {
  return (
    <main className={styles.page}>
      <h1 className="sr-only">AMPP RGIPT Team</h1>
      <section className={styles.banner}>
        <div className={styles.bannerContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={styles.bannerContent}
          >
            <div className={styles.bannerEyebrow}>Leadership & Responsibility</div>
            <h2 className={styles.bannerTitle}>
              The Chain <br />
              <span className={styles.bannerAccentText}>of Command</span>
            </h2>
            <div className={styles.bannerDivider}>
              <span className={styles.bannerDot} />
            </div>
            <p className={styles.bannerDescription}>
              Our organization is steered by a meticulously structured hierarchy of visionaries and professionals.
              This chain of command is the backbone of our operations, ensuring that the collective ambition
              of AMPP RGIPT is upheld with unwavering precision, accountability, and a shared commitment
              to excellence in every endeavor.
            </p>
          </motion.div>
        </div>
      </section>

      <div className={styles.creditRoll}>
        {SECTIONS.map((section, i) => (
          <Section key={section.id} section={section} globalIndex={i} />
        ))}
      </div>

      <div className={styles.bottomRule} aria-hidden="true" />
    </main>
  );
}
