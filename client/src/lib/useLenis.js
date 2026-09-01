import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

function silkOut(t) {
  return 1 - Math.pow(1 - t, 6);
}

export function useLenis() {
  const rafCallbackRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: silkOut,
      lerp: 0.065,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      smoothTouch: false, // Disable touch smoothing to allow native momentum scrolls on mobile
      syncTouch: false,  // Stop hijacking touch scrolling to fix responsiveness issues on phones
      infinite: false,
      autoResize: true,
    });

    globalLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    rafCallbackRef.current = rafCallback;

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
}

export function smoothScrollTo(target, offset = 0) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: 1.6,
      easing: silkOut,
    });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
