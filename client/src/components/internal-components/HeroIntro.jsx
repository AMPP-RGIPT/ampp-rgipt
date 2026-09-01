import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import styles from "./HeroIntro.module.css";
import { getLenis } from "../../lib/useLenis";

const STRIP_COUNT = 10;

export default function HeroIntro({
  duration = 2800,
  estYear  = "2026",
  onReveal,
  onDone,
}) {
  const [visible, setVisible] = useState(true);
  const introRef   = useRef(null);
  const contentRef = useRef(null);
  const grainRef   = useRef(null);
  const stripRefs  = useRef([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const blockWheel = (e) => e.preventDefault();
    const blockTouch = (e) => e.preventDefault();
    const scrollKeys = new Set([32, 33, 34, 35, 36, 37, 38, 39, 40]);
    const blockKeys = (e) => {
      if (scrollKeys.has(e.keyCode)) e.preventDefault();
    };

    document.addEventListener("wheel", blockWheel, { passive: false });
    document.addEventListener("touchmove", blockTouch, { passive: false });
    document.addEventListener("keydown", blockKeys, { passive: false });

    const stopLenisInterval = setInterval(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
        clearInterval(stopLenisInterval);
      }
    }, 50);

    return () => {
      clearInterval(stopLenisInterval);
      document.removeEventListener("wheel", blockWheel);
      document.removeEventListener("touchmove", blockTouch);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(startExit, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const startExit = () => {
    if (document.hidden) {
      setVisible(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      const lenis = getLenis();
      if (lenis) lenis.start();
      onReveal?.();
      onDone?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        const lenis = getLenis();
        if (lenis) lenis.start();
        onDone?.();
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.98,
      filter: "blur(12px)",
      duration: 0.8,
      ease: "power2.inOut",
    });

    tl.to(grainRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, "-=0.6");

    tl.call(() => onReveal?.(), null, "-=0.4");

    tl.to(stripRefs.current, {
      yPercent: 100,
      duration: 1.1,
      ease: "expo.inOut",
      stagger: {
        each: 0.045,
        from: "start",
      },
    }, "-=0.75");
  };

  if (!visible) return null;

  return (
    <div className={styles.intro} aria-label="Loading" role="status">
      <div className={styles.stripsContainer} aria-hidden="true">
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (stripRefs.current[i] = el)}
            className={styles.strip}
          />
        ))}
      </div>

      <div ref={grainRef} className={styles.grain} aria-hidden="true" />

      <div ref={contentRef} className={styles.stage}>
        <span className={styles.abbrev} aria-label="AMPP">
          AMPP
        </span>

        <div className={styles.divider} aria-hidden="true">
          <motion.svg
            width="120"
            height="20"
            viewBox="0 0 120 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 10 H120"
              stroke="white"
              strokeWidth="1.5"
              animate={{
                d: [
                  "M0 10 H120",
                  "M0 10 Q30 2, 60 10 T120 10",
                  "M0 10 Q30 18, 60 10 T120 10",
                  "M0 10 H120",
                ],
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </motion.svg>
        </div>

        <span className={styles.sub} aria-label="RGIPT">
          RGIPT
        </span>

        <span className={styles.est}>
          Est.&nbsp;&nbsp;{estYear}
        </span>
      </div>
    </div>
  );
}
