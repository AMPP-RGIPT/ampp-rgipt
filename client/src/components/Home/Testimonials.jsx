import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Howl } from 'howler';
import styles from './Testimonials.module.css';

import sanjaythommandruImg from '../../assets/testimonial/sanjaythommandru.jpg';
import vinayakawasthiImg from '../../assets/testimonial/vinayakawasthi.jpg';
import sharadshuklaImg from '../../assets/testimonial/sharadshukla.jpg';
import mohdyawarImg from '../../assets/testimonial/mohdyawar.jpg';
import nandinisharmaImg from '../../assets/testimonial/nandinisharma.jpg';
import anubhavchaudharyImg from '../../assets/testimonial/anubhavchaudhary.jpg';
import ananyadasImg from '../../assets/testimonial/ananyadas.jpg';
import yashtripathiImg from '../../assets/testimonial/yashtripathi.jpg';
import shivamrajImg from '../../assets/testimonial/shivamraj.jpg';
import anupyadavImg from '../../assets/testimonial/anupyadav.jpeg';
import sandeephuddaImg from '../../assets/testimonial/sandeephudda.jpg';
import muskanmishraImg from '../../assets/testimonial/muskanmishra.jpg';

gsap.registerPlugin(ScrollTrigger);

const testimonialSound = new Howl({
  src: ['/sounds/testimonial.wav'],
  volume: 0.35,
  preload: true
});

const testimonialsRow1 = [
  {
    name: "Mohd Yawar",
    role: "Head of Membership Team",
    image: mohdyawarImg,
    text: "Being part of AMPP has been a rewarding journey, both professionally and personally. As the Head of the AMPP Membership Team, I’ve had the opportunity to connect with professionals from diverse backgrounds, contribute to our growing membership community, and encourage knowledge-sharing in the field of corrosion and materials protection. What makes AMPP valuable is the platform it creates for people across industries and geographies to learn, collaborate, and build meaningful connections. I’m proud to contribute to this community and look forward to creating more opportunities for members to connect, grow, and make an impact in corrosion prevention and materials protection."
  },
  {
    name: "Ananya Das",
    role: "Designing Team Head",
    image: ananyadasImg,
    text: "AMPP RGIPT SC has been a rewarding platform for developing my leadership, creativity, and collaborative skills. As the Designing Team Head, I’ve had the opportunity to lead a creative team and contribute to strengthening the chapter's visual identity and outreach."
  },
  {
    name: "Shivam Raj",
    role: "Membership Chair",
    image: shivamrajImg,
    text: "Serving as Membership Chair at AMPP has been a very rewarding and professional experience for me. It has given me a wonderful opportunity to develop my leadership, communication, and networking skills by interacting with members and helping the organization grow. This position has enhanced my skill to lead, work team-oriented, and forge meaningful relationships in the AMPP community. AMPP has given me the platform and the opportunities to help me grow personally and professionally, and I’m truly thankful for that. I sincerely wish AMPP continued growth, success, and excellence in the years ahead."
  },
  {
    name: "Thommandru Sanjay",
    role: "Vice Chair",
    image: sanjaythommandruImg,
    text: "Being the Vice Chair of the AMPP Student Chapter has been a rewarding experience that has helped me grow both professionally and personally. It has provided me with valuable opportunities to connect with professionals and fellow students in the field of corrosion and materials engineering. Through various technical activities, events, and collaborative initiatives, AMPP has strengthened my technical knowledge, leadership skills, and professional network. I am proud to be part of a community that promotes learning, innovation, and awareness in corrosion engineering."
  },
  {
    name: "Sandeep Hudda",
    role: "Technical Team",
    image: sandeephuddaImg,
    text: "Being a part of the Technical Team at AMPP has been a great learning experience. It has helped me strengthen my technical skills, work collaboratively with a team, and gain practical exposure to corrosion, materials, and asset integrity. AMPP has provided me with a platform to learn, contribute, and grow both technically and professionally."
  },
  {
    name: "Nandini Sharma",
    role: "Member",
    image: nandinisharmaImg,
    text: "It's a quite active chapter. Every event is taken with solemnity."
  }
];

const testimonialsRow2 = [
  {
    name: "Yash Tripathi",
    role: "Event Head (3rd Year)",
    image: yashtripathiImg,
    text: "Being the Event Head of the AMPP RGIPT Student Chapter has been a truly enriching experience. It gave me the opportunity to step into a leadership role, take on new responsibilities, and learn the intricacies of planning and executing events. From coordinating with the team to handling challenges on the ground, every experience taught me something new. This journey not only enhanced my leadership and management skills but also gave me a completely new perspective on teamwork, responsibility, and execution. I am grateful for the experience and the growth it brought along."
  },
  {
    name: "Sharad Shukla",
    role: "Secretary",
    image: sharadshuklaImg,
    text: "Being the Secretary of AMPP RGIPT Student Chapter has been a great learning experience which has helped me to improve my team management, leadership and communication skills. While I was running two successful orientation programs and events such as Corrothon with a team of over 70 people I learned the importance of teamwork, accountability and execution. This trip has taught me a lot about corrosion engineering and how it is applied in the real world and helped me grow as a person and a professional."
  },
  {
    name: "Anup Kumar Yadav",
    role: "Member",
    image: anupyadavImg,
    text: "“Curiosity drives discovery, knowledge drives innovation, and collaboration drives excellence.” Being a part of the AMPP Student Chapter has given me the opportunity to experience all three. It has broadened my technical perspective, encouraged me to explore beyond conventional learning, and connected me with a community passionate about engineering and innovation. Every experience has been a step toward becoming a more analytical, adaptable, and forward-thinking engineer."
  },
  {
    name: "Anubhav Chaudhary",
    role: "Member",
    image: anubhavchaudharyImg,
    text: "Being a part of AMPP has been a great experience so far. I’ve had the chance to work with an amazing team, learn new things, and be involved in events that bring students together. More than anything, it has helped me grow, both personally and professionally."
  },
  {
    name: "Vinayak Awasthi",
    role: "Executive Member",
    image: vinayakawasthiImg,
    text: "AMPP has played a significant role in my overall growth, helping me build confidence, character, communication, and leadership skills. It gave me a clear understanding of what it takes to become a good leader—taking responsibility, working with people, and making decisions effectively. This training greatly helped me during interviews, especially when I was asked to demonstrate my leadership qualities with real examples. Along with leadership development, webinars and interactions with faculty coordinators also gave me valuable technical and industry exposure. Overall, AMPP has helped me become more confident, industry-aware, and prepared for my professional journey."
  },
  {
    name: "Muskan Mishra",
    role: "Joint Secretary",
    image: muskanmishraImg,
    text: "Being Joint Secretary of RGIPT AMPP has turned into something more than a title on paper. There have been moments that pushed me out of my comfort zone, and plenty that reminded me why a team actually matters when things get hard. One thing I have learned along the way is that leadership is not about being the loudest person in the room. It’s mostly about listening, showing up when it matters, and having your team’s back when things go south. What’s stuck with me the most is the people – the people I’ve worked with and the people who’ve had my back when things haven’t gone to plan. That’s the part of AMPP that I’ll actually take away from this, more than any one event we ran."
  }
];

const TestimonialCard = memo(function TestimonialCard({ item }) {
  return (
    <div
      className={styles.cardContainer}
      style={{ willChange: 'transform, box-shadow' }}
      onMouseEnter={() => {
        testimonialSound.stop();
        testimonialSound.play();
      }}
    >
      <div className={styles.imageWrap} style={{ willChange: 'transform, opacity' }}>
        <img src={item.image || ""} alt={item.name} loading="lazy" />
      </div>
      <div className={styles.contentCard} style={{ willChange: 'transform, opacity' }}>
        <span className={styles.quoteIcon}>“</span>
        <p className={styles.testimonialText}>{item.text}</p>
        <div className={styles.footer}>
          <span className={styles.userName}>{item.name}</span>
        </div>
      </div>
    </div>
  );
});

const TestimonialRow = memo(function TestimonialRow({ items, direction = 'left', speed = 0.8 }) {
  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isInteracting = useRef(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const tripleItems = [...items, ...items, ...items];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const setInitialPos = () => {
      const oneSetWidth = container.scrollWidth / 3;
      if (oneSetWidth > 0 && container.scrollLeft === 0) {
        container.scrollLeft = oneSetWidth;
      }
    };
    setInitialPos();
    const timer = setTimeout(setInitialPos, 100);
    return () => clearTimeout(timer);
  }, [items]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const oneSetWidth = container.scrollWidth / 3;
    if (oneSetWidth <= 0) return;

    if (container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft -= oneSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += oneSetWidth;
    }
  };

  useEffect(() => {
    let animId;
    const step = () => {
      const container = containerRef.current;
      if (container && isIntersecting && !isInteracting.current) {
        const delta = direction === 'left' ? speed : -speed;
        container.scrollLeft += delta;
        handleScroll();
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isIntersecting, direction, speed]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDown.current = true;
    isInteracting.current = true;
    const container = containerRef.current;
    if (!container) return;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeftStart.current = container.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    isInteracting.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    isInteracting.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(x - startX.current) > 4) {
      container.scrollLeft = scrollLeftStart.current - walk;
      handleScroll();
    }
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  return (
    <div
      className={styles.trackWrapper}
      ref={containerRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => { isInteracting.current = true; }}
    >
      <div className={styles.marqueeTrack}>
        {tripleItems.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
});

function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.' + styles.header, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.' + styles.header,
          start: 'top 90%',
          fastScrollEnd: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Voices of Excellence</span>
        <h2 className={styles.title}>Member Stories</h2>
      </div>

      <div className={styles.wall}>
        <TestimonialRow items={testimonialsRow1} direction="left" speed={0.8} />
        <TestimonialRow items={testimonialsRow2} direction="right" speed={0.8} />
      </div>
    </section>
  );
}

export default memo(Testimonials);

