import React, { useRef, useLayoutEffect, useEffect, useState, memo } from "react";
import gsap from "gsap";

import styles from "./Hero.module.css";
import teamImg from "../../assets/team.jpg";

function Hero({ revealed = false }) {

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descRef = useRef(null);
  const barRef = useRef(null);

  const getIsMobile = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = (e) => setIsMobile(e.matches);
    if (query.addEventListener) query.addEventListener("change", update);
    else query.addListener(update);
    return () => {
      if (query.removeEventListener) query.removeEventListener("change", update);
      else query.removeListener(update);
    };
  }, []);

  useLayoutEffect(() => {
    if (isMobile) {
      gsap.set(
        [sectionRef.current, imageRef.current, contentRef.current,
        line1Ref.current, line2Ref.current, line3Ref.current,
        descRef.current, barRef.current],
        { clearProps: "all" }
      );
      return;
    }

    if (revealed) return;

    gsap.set(sectionRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { opacity: 0, y: 18 });
    gsap.set(contentRef.current, { opacity: 0, y: 36 });
    gsap.set(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { opacity: 0, y: 14 }
    );
    gsap.set(descRef.current, { opacity: 0, y: 10 });
    gsap.set(barRef.current, { scaleY: 0, transformOrigin: "top center" });
  }, [isMobile, revealed]);

  useEffect(() => {
    if (!revealed) return;

    if (isMobile) {
      sectionRef.current?.classList.add(styles.revealed);
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.4 }
      });

      tl.to(sectionRef.current, { opacity: 1 }, 0);

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        clearProps: "willChange,filter"
      }, 0.1);

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.6
      }, 0.2);

      tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 1,
        y: 0,
        stagger: 0.12
      }, 0.4);

      tl.to(descRef.current, {
        opacity: 1,
        y: 0
      }, 0.7);

      tl.to(barRef.current, {
        scaleY: 1,
        duration: 1.2,
        clearProps: "willChange"
      }, 0.3);
    }, sectionRef);

    sectionRef.current?.classList.add(styles.revealed);

    return () => ctx.revert();
  }, [revealed, isMobile]);

  return (
    <section id="home" ref={sectionRef} className={styles.wrapper} aria-label="Hero">
      <div className={styles.container}>
        <div ref={imageRef} className={styles.imageWrap} aria-hidden="true" style={{ willChange: 'transform, opacity' }}>
          <img
            src={teamImg}
            alt="AMPP student chapter team"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className={styles.imageOverlay} />
        </div>

        <div ref={contentRef} className={styles.content} style={{ willChange: 'transform, opacity' }}>
          <div className={styles.headingBlock}>
            <div ref={barRef} className={styles.bar} aria-hidden="true" style={{ willChange: 'transform' }} />
            <div className={styles.headingWrap}>
              <h1>
                <span ref={line1Ref} className={styles.line1}>
                  A Community of Thinkers,
                </span>
                <span ref={line2Ref} className={styles.line2}>
                  Builders,
                </span>
                <span ref={line3Ref} className={styles.line3}>
                  Driven by{" "}
                  <span className={styles.accent}>Materials</span>.
                </span>
              </h1>
            </div>
          </div>

          <p ref={descRef} className={styles.description}>
            Established at RGIPT, the AMPP Student Chapter explores
            corrosion science, protection strategies, and real-world
            engineering challenges.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);


