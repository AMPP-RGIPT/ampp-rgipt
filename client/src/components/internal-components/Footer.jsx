import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import logoImg from "../../assets/ampp.png";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const topBarRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef(null);
  const noteRef = useRef(null);
  const bgWrapRef = useRef(null);
  const bgFillRef = useRef(null);
  const bgTextRef = useRef(null);
  const link1Ref = useRef(null);
  const link2Ref = useRef(null);

  const lerpRef = useRef({ current: 44, target: 44, raf: null });

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

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (isMobile) {

      gsap.set(
        [topBarRef.current, brandRef.current, linksRef.current,
        link1Ref.current, link2Ref.current, noteRef.current,
        bgFillRef.current, bgTextRef.current],
        { clearProps: "all" }
      );
      return;
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: footer,
        start: "top 90%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(topBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: "power4.out",
          scrollTrigger: trigger
        }
      );

      gsap.fromTo(brandRef.current,
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "power4.out", delay: 0.1,
          scrollTrigger: trigger
        }
      );

      gsap.fromTo(linksRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power4.out", delay: 0.2,
          scrollTrigger: trigger
        }
      );

      gsap.fromTo(
        [link1Ref.current, link2Ref.current],
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          stagger: 0.12, delay: 0.35,
          scrollTrigger: trigger
        }
      );

      gsap.fromTo(noteRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "power4.out", delay: 0.15,
          scrollTrigger: trigger
        }
      );

      gsap.fromTo(
        [bgFillRef.current, bgTextRef.current],
        { opacity: 0, y: "30%" },
        {
          opacity: 1, y: "20%", duration: 1.5, ease: "power4.out", delay: 0.4,
          scrollTrigger: trigger
        }
      );

    }, footer);

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ctx?.revert();
      window.removeEventListener('load', onLoad);
      clearTimeout(refresh);
    };
  }, [isMobile]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || isMobile) return;

    const lerp = lerpRef.current;
    const LERP_FACTOR = 0.055;

    function lerpLoop() {
      lerp.current += (lerp.target - lerp.current) * LERP_FACTOR;
      bgWrapRef.current?.style.setProperty("--fw", lerp.current.toFixed(3));
      lerp.raf = requestAnimationFrame(lerpLoop);
    }

    function onMouseMove(e) {
      const rect = footer.getBoundingClientRect();
      const dy = Math.max(Math.min((e.clientY - rect.top) / rect.height, 1), 0);
      lerp.target = (150 - 20) * dy + 20;
    }

    function onMouseLeave() {
      lerp.target = 44;
    }

    lerp.raf = requestAnimationFrame(lerpLoop);
    footer.addEventListener("mousemove", onMouseMove, { passive: true });
    footer.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(lerp.raf);
      footer.removeEventListener("mousemove", onMouseMove);
      footer.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isMobile]);

  return (
    <footer ref={footerRef} className={styles.footer}>

      <div ref={topBarRef} className={styles.accentBar} aria-hidden="true" />

      <div className={styles.footerTop}>

        <div ref={brandRef} className={styles.footerBrand}>
          <img src={logoImg} alt="AMPP RGIPT Logo" className={styles.brandLogo} />
          <aside>
            <p>
              Rajiv Gandhi Institute of Petroleum Technology<br />
              Mubarakhpur Mukhetia More, Bahadurpur, Jais<br />
              Post Harbanshganj, Amethi – 229304, Uttar Pradesh
            </p>
            <a
              href="https://maps.app.goo.gl/sagyZbCd2uepRG769"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.locationLink}
            >
              <span>View Location</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 13 7 13s7-9.13 7-13
                     c0-3.87-3.13-7-7-7zM12 11c1.1 0 2-.9 2-2s-.9-2-2-2
                     -2 .9-2 2 .9 2 2 2z"
                />
              </svg>
            </a>
          </aside>

          <nav className={styles.quickLinksNav} aria-label="Footer navigation">
            <span className={styles.quickLinksHeading}>Quick Links</span>
            <ul className={styles.quickLinksList}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div ref={linksRef} className={styles.footerLinks}>
          <h3 className={styles.socialHeading}>YOU HAVEN'T SEEN EVERYTHING YET.</h3>
          <p className={styles.socialSubtext}>
            There's more happening at AMPP-RGIPT than what's on this website.
          </p>

          <div className={styles.socialColumn}>
            <a
              ref={link1Ref}
              href="https://www.instagram.com/ampp_rgipt?igsh=aGk0MTU3ZGl5bG5r"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram - See what's been happening"
              className={styles.socialCard}
            >
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={styles.platformIcon}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitleRow}>
                  <span className={styles.platformName}>Instagram</span>
                  <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
                </div>
                <span className={styles.socialTeaser}>SEE WHAT'S BEEN HAPPENING</span>
              </div>
            </a>

            <a
              ref={link2Ref}
              href="https://www.linkedin.com/company/ampp-rgipt-student-chapter/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn - What's coming next"
              className={styles.socialCard}
            >
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={styles.platformIcon}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitleRow}>
                  <span className={styles.platformName}>LinkedIn</span>
                  <span className={styles.arrowIcon} aria-hidden="true">&rarr;</span>
                </div>
                <span className={styles.socialTeaser}>WHAT'S COMING NEXT</span>
              </div>
            </a>
          </div>
        </div>

        <div ref={noteRef} className={styles.footerNote}>
          <p className={styles.noteLabel}>Developed By</p>
          <div className={styles.devProfile}>
            <span className={styles.devName}>Rudraksh Chamoli</span>
            <div className={styles.devSocials}>
              <a href="https://github.com/chamoli-rudraksh" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/rudraksh-chamoli/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>

              <a href="https://drive.google.com/file/d/1HRIMviU29SJBSrmgrsnS3BQZq496E8JL/view?usp=drive_link" target="_blank" rel="noopener noreferrer" aria-label="Resume">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div ref={bgWrapRef} className={styles.footerBgWrap} aria-hidden="true">
        <span ref={bgFillRef} className={styles.footerBgFill}>AMPP</span>
        <span ref={bgTextRef} className={styles.footerBgText}>AMPP</span>
      </div>

    </footer>
  );
}
