import React, { useEffect, useRef } from "react";
import { getLenis } from "../../lib/useLenis";

export default function SmoothWrapper({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    let scrollTimeout = null;

    const onScroll = ({ velocity }) => {
      const absVelocity = Math.abs(velocity);

      if (absVelocity > 0.5) {
        html.classList.add("is-scrolling");

        if (absVelocity > 15) {
          html.classList.add("is-scrolling-fast");
        } else {
          html.classList.remove("is-scrolling-fast");
        }
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        html.classList.remove("is-scrolling", "is-scrolling-fast");
      }, 150);

      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      html.style.setProperty("--scroll-progress", progress.toFixed(4));
      html.style.setProperty("--scroll-velocity", absVelocity.toFixed(3));
    };

    const checkInterval = setInterval(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.on("scroll", onScroll);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(scrollTimeout);
      const lenis = getLenis();
      if (lenis) lenis.off("scroll", onScroll);
      html.classList.remove("is-scrolling", "is-scrolling-fast");
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        willChange: "auto",
        contain: "layout style",
      }}
    >
      {children}
    </div>
  );
}
