import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar           from "./components/internal-components/Navbar";
import Footer           from "./components/internal-components/Footer";
import SmoothWrapper    from "./components/internal-components/SmoothWrapper";
import HeroIntro        from "./components/internal-components/HeroIntro";
import PageTransition   from "./components/internal-components/PageTransition";
import ScrollToTop      from "./components/internal-components/ScrollToTop";

import Home             from "./components/Home/home";
import About            from "./components/About/about";
import TeamPage         from "./components/Team/TeamPage";
import ContactPage      from "./components/Contact/ContactPage";
import EventsPage       from "./components/Events/EventsPage";

import { useLenis, getLenis } from "./lib/useLenis";
import { Howl, Howler } from "howler";

gsap.registerPlugin(ScrollTrigger);

// Global hover sound for buttons
const globalHoverSound = new Howl({
  src: ["/sounds/button-hover.mp3"],
  volume: 0.35,
  preload: true
});

// Helper to determine if an element or its ancestor functions as a button or active link
const findButtonAncestor = (el) => {
  let current = el;
  while (current && current !== document.body) {
    if (
      current.tagName === 'BUTTON' ||
      current.getAttribute('role') === 'button' ||
      (current.tagName === 'INPUT' && (current.type === 'submit' || current.type === 'button')) ||
      (current.className && typeof current.className === 'string' && (
        current.className.toLowerCase().includes('btn') ||
        current.className.toLowerCase().includes('button')
      ))
    ) {
      return current;
    }

    if (current.tagName === 'A') {
      let parent = current.parentElement;
      while (parent && parent !== document.body) {
        if (
          parent.tagName === 'NAV' || 
          parent.tagName === 'HEADER' || 
          parent.tagName === 'FOOTER' ||
          parent.id === 'mobile-menu' ||
          (parent.className && typeof parent.className === 'string' && (
            parent.className.toLowerCase().includes('nav') ||
            parent.className.toLowerCase().includes('footer') ||
            parent.className.toLowerCase().includes('menu')
          ))
        ) {
          return current;
        }
        parent = parent.parentElement;
      }
    }

    current = current.parentElement;
  }
  return null;
};

function AnimatedRoutes({ location, revealed }) {
  const containerRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    gsap.fromTo(containerRef.current,
      {
        opacity: 0,
        scale: 0.98,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        clearProps: "all",
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      }
    );

  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      ref={containerRef}
      style={{ width: '100%', willChange: 'transform, opacity, filter' }}
    >
      <Suspense fallback={
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fdf8f3',
          color: '#8b3a1e',
          fontFamily: 'Raleway, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 600,
          letterSpacing: '0.1em'
        }}>
          LOADING CHAPTER...
        </div>
      }>
        <Routes location={location}>
          <Route path="/" element={<Home revealed={revealed} />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  const INTRO_DURATION = 2800;
  const location = useLocation();
  const transitionRef = useRef(null);
  const isFirstLoad = useRef(true);

  const getIsMobile = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false;

  const [isMobileOnLoad] = useState(getIsMobile);
  const [displayLocation, setDisplayLocation] = useState(location);

  const [introSeen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("ampp_intro_seen") === "true";
    } catch (e) {
      console.warn("sessionStorage is not accessible:", e);
      return false;
    }
  });

  const [heroRevealed, setHeroRevealed] = useState(isMobileOnLoad || introSeen);

  const [isAudioMuted, setIsAudioMuted] = useState(() => {
    if (typeof window !== "undefined" && Howler && Howler.ctx) {
      return Howler.ctx.state === 'suspended';
    }
    return true;
  });

  const handleUnmute = async (e) => {
    if (e) e.stopPropagation();
    if (Howler && Howler.ctx) {
      if (Howler.ctx.state === 'suspended') {
        try {
          await Howler.ctx.resume();
        } catch (err) {
          console.warn("AudioContext unlock failed on button click:", err);
        }
      }
    }
    Howler.mute(false);
    setIsAudioMuted(false);
  };

  useLenis();

  // Attach global button hover sound listeners
  useEffect(() => {
    const handleMouseOver = (e) => {
      const button = findButtonAncestor(e.target);
      if (button) {
        if (button.dataset.hoverSoundPlayed === 'true') return;
        button.dataset.hoverSoundPlayed = 'true';
        
        globalHoverSound.stop();
        globalHoverSound.play();
      }
    };

    const handleMouseOut = (e) => {
      const button = findButtonAncestor(e.target);
      if (button) {
        if (!e.relatedTarget || !button.contains(e.relatedTarget)) {
          delete button.dataset.hoverSoundPlayed;
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Play typing sound when typing in input fields
  useEffect(() => {
    const typingSound = new Howl({
      src: ["/sounds/typing.mp3"],
      volume: 0.35,
      preload: true
    });

    const handleKeyDown = (e) => {
      const target = e.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        typingSound.stop();
        typingSound.play();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Unlock audio context on the first user interaction anywhere
  useEffect(() => {
    const unlockAudio = async () => {
      if (Howler && Howler.ctx && Howler.ctx.state === 'suspended') {
        try {
          await Howler.ctx.resume();
          console.log("AudioContext unlocked successfully via global listener.");
        } catch (err) {
          console.warn("AudioContext unlock failed:", err);
        }
      }
      setIsAudioMuted(false);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (location.pathname === displayLocation.pathname) {
      return;
    }

    if (!heroRevealed) {
      setDisplayLocation(location);
      return;
    }

    if (transitionRef.current) {
      gsap.to(".mainContent", {
        opacity: 0.7,
        scale: 0.98,
        duration: 0.4,
        ease: "power2.inOut"
      });

      transitionRef.current.playTransition().then(() => {
        setDisplayLocation(location);
        gsap.set(".mainContent", {
          opacity: 1,
          scale: 1
        });
      });
    } else {

      setDisplayLocation(location);
    }
  }, [location.pathname, heroRevealed, displayLocation.pathname]);

  const handleReveal = () => {
    try {
      sessionStorage.setItem("ampp_intro_seen", "true");
    } catch (e) {
      console.warn("sessionStorage.setItem failed:", e);
    }
    if (document.hidden) {
      setHeroRevealed(true);
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeroRevealed(true);
        });
      });
    }
  };

  return (
    <>
      <ScrollToTop />
      <SmoothWrapper>
        <div className="app">
          <PageTransition ref={transitionRef} />
        {!isMobileOnLoad && !introSeen && (
          <HeroIntro
            duration={INTRO_DURATION}
            onReveal={handleReveal}
            onDone={() => {}}
          />
        )}
        <Navbar />
        <main className="mainContent">
          <AnimatedRoutes location={displayLocation} revealed={heroRevealed} />
        </main>
        <Footer />
      </div>
    </SmoothWrapper>
    {isAudioMuted && (
      <button 
        className="sound-toggle-btn" 
        onClick={handleUnmute}
        aria-label="Unmute sound"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        <span>Sound Off</span>
      </button>
    )}
    </>
  );
}