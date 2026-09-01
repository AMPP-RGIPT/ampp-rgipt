import React, { useRef, useEffect, useState, memo } from 'react';
import gsap from 'gsap';
import { Howl } from 'howler';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Team.module.css';
import technicalImg from '../../assets/capsule/technical.png';
import designImg from '../../assets/capsule/design.png';
import eventsImg from '../../assets/capsule/event.png';
import membershipImg from '../../assets/capsule/membership.png';
import publicImg from '../../assets/capsule/publicengagement.png';
import outreachImg from '../../assets/capsule/outreach.png';
import proposalImg from '../../assets/capsule/proposal.png';
import editorialImg from '../../assets/capsule/editorial.png';
import interactionImg from '../../assets/capsule/interaction-innovation.png';


gsap.registerPlugin(ScrollTrigger);

// Initialize Howler sound instances
const hoverSound = new Howl({
  src: ['/sounds/hover.mp3'],
  volume: 0.4,
  preload: true
});

const teams = [
  { name: "Designing Team", image: designImg },
  { name: "Technical Team", image: technicalImg },
  { name: "Events Team", image: eventsImg },
  { name: "Membership Team", image: membershipImg },
  { name: "Outreach Team", image: outreachImg },
  { name: "Public Engagement Team", image: publicImg },
  { name: "Interaction & Innovation Team", image: interactionImg },
  { name: "Editorial Team", image: editorialImg },
  { name: "Proposal Team", image: proposalImg },
];

function Team() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseCoords = useRef({ x: 0, y: 0 });

  const getIsMobile = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = (e) => setIsMobile(e.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setActiveIndex(null);

    if (isMobile) {
      gsap.set([eyebrowRef.current, ...rowRefs.current], { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      setTimeout(() => ScrollTrigger.refresh(), 100);

      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power4.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 90%' },
        }
      );

      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 22 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power4.out',
            delay: i * 0.05,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        ScrollTrigger.create({
          trigger: row,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => {
            setActiveIndex(i);
          },
          onEnterBack: () => {
            setActiveIndex(i);
          },
          onLeave: () => {
            setActiveIndex(prev => prev === i ? null : prev);
          },
          onLeaveBack: () => {
            setActiveIndex(prev => prev === i ? null : prev);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Track mouse coordinates globally on mousemove
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sync hovered row state during scrolling to prevent stuck hover selections
  // Throttled to ~33fps to completely eliminate layout thrashing and scrolling lag on macOS/MacBooks
  useEffect(() => {
    let lastTime = 0;
    const handleScroll = () => {
      if (isMobile) return;
      const now = performance.now();
      if (now - lastTime < 30) return;
      lastTime = now;

      const element = document.elementFromPoint(mouseCoords.current.x, mouseCoords.current.y);
      if (!element) {
        setHoveredIndex(null);
        return;
      }

      const row = element.closest(`.${styles.teamRow}`);
      if (row) {
        const index = parseInt(row.getAttribute('data-index'), 10);
        setHoveredIndex(index);
      } else {
        setHoveredIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const handleDocumentClick = (e) => {
      if (!e.target.closest(`.${styles.teamRow}`)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isMobile]);

  const handleRowClick = (i) => {
    if (!isMobile) return;
    setActiveIndex(prev => {
      const next = prev === i ? null : i;
      if (next !== null) {
        hoverSound.stop();
        hoverSound.play();
      }
      return next;
    });
  };

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <p ref={eyebrowRef} className={styles.eyebrow}>
        The Teams Behind the Chapter
      </p>

      <div className={styles.teamsList}>
        {teams.map((team, i) => {
          const isActive = activeIndex === i;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              ref={el => rowRefs.current[i] = el}
              className={`${styles.teamRow} ${isActive ? styles.active : ''} ${isHovered ? styles.hovered : ''}`}
              data-index={i}
              onClick={() => handleRowClick(i)}
              onMouseEnter={() => {
                if (!isMobile) {
                  setHoveredIndex(i);
                  hoverSound.stop();
                  hoverSound.play();
                }
              }}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              style={{ willChange: 'opacity, transform' }}
            >
              <span className={styles.teamName}>{team.name}</span>

              <div className={styles.hoverReveal} data-keep-animating aria-hidden="true" style={{ willChange: 'opacity, transform' }}>
                {(isHovered || isActive) && (
                  <div className={styles.marqueeTrack} data-keep-animating style={{ willChange: 'transform' }}>
                    {[...Array(8)].map((_, j) => (
                      <div key={j} className={styles.marqueeItem} data-keep-animating>
                        <span className={styles.marqueeText} data-keep-animating>{team.name}</span>
                        <div className={styles.capsule} data-keep-animating>
                          {team.image && <img src={team.image} alt={team.name} loading="lazy" data-keep-animating />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(Team);
