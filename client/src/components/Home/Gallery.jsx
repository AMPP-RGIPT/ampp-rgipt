import React, { useRef, useState, useEffect } from 'react';
import { Howl } from 'howler';
import styles from './Gallery.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

// Import local gallery images with exact case-sensitive extensions
import img1 from '../../assets/gallery/1.jpeg';
import img2 from '../../assets/gallery/2.jpeg';
import img3 from '../../assets/gallery/3.jpeg';
import img4 from '../../assets/gallery/4.jpeg';
import img5 from '../../assets/gallery/5.jpeg';
import img6 from '../../assets/gallery/6.jpg';
import img7 from '../../assets/gallery/7.jpeg';
import img8 from '../../assets/gallery/8.jpg';
import img9 from '../../assets/gallery/9.jpeg';
import img10 from '../../assets/gallery/10.jpeg';
import img11 from '../../assets/gallery/11.jpeg';


const galleryImages = [
  { id: 1, url: img1 },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
  { id: 5, url: img5 },
  { id: 6, url: img6 },
  { id: 7, url: img7 },
  { id: 8, url: img8 },
  { id: 9, url: img9 },
  { id: 10, url: img10 },
  { id: 11, url: img11 }
];

// Double the images array to allow a longer, continuous scrolling experience
const scrollingImages = [...galleryImages, ...galleryImages];

export default function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Auto-scroll loop using requestAnimationFrame for 60fps buttery smoothness
  useEffect(() => {
    if (!isIntersecting) return;

    let animationFrameId;
    const speed = 0.6; // Speed of auto-scrolling (pixels per frame)

    const scrollLoop = () => {
      if (!trackRef.current) return;

      if (!isPaused && !document.hidden) {
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;

        // Loop back to start seamlessly if we hit the end
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          trackRef.current.scrollLeft = 0;
        } else {
          trackRef.current.scrollLeft += speed;
        }
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isIntersecting]);

  const updateArrows = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', updateArrows);
      updateArrows();
    }
    return () => {
      if (track) track.removeEventListener('scroll', updateArrows);
    };
  }, []);

  // Pause autoplay on direct user interaction (trackpad wheel, mobile swipe, etc.)
  // to prevent auto-scroll from fighting manual scrolls/swipes on MacBooks and mobile screens
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleUserInteraction = () => {
      pauseAutoPlayTemporarily();
    };

    track.addEventListener('wheel', handleUserInteraction, { passive: true });
    track.addEventListener('touchstart', handleUserInteraction, { passive: true });
    track.addEventListener('touchmove', handleUserInteraction, { passive: true });
    track.addEventListener('pointerdown', handleUserInteraction, { passive: true });

    return () => {
      track.removeEventListener('wheel', handleUserInteraction);
      track.removeEventListener('touchstart', handleUserInteraction);
      track.removeEventListener('touchmove', handleUserInteraction);
      track.removeEventListener('pointerdown', handleUserInteraction);
    };
  }, []);

  const pauseAutoPlayTemporarily = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Resume auto-scroll after 800ms of manual inactivity (duration of smooth scroll transition)
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 800);
  };

  const handleScroll = (direction) => {
    if (!trackRef.current) return;
    pauseAutoPlayTemporarily();

    const { clientWidth } = trackRef.current;
    const scrollAmount = clientWidth * 0.75;

    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.titleContainer}>
        <span className={styles.line}></span>
        <h2 className={styles.title}>GALLERY</h2>
        <span className={styles.line}></span>
      </div>

      <div className={styles.sliderWrapper}>
        {/* Left navigation arrow - vertically centered in-line with images */}
        <button
          onClick={() => handleScroll('left')}
          className={`${styles.navBtn} ${styles.prevBtn}`}
          disabled={!showLeftArrow}
          aria-label="Previous Slide"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>

        {/* Right navigation arrow - vertically centered in-line with images */}
        <button
          onClick={() => handleScroll('right')}
          className={`${styles.navBtn} ${styles.nextBtn}`}
          disabled={!showRightArrow}
          aria-label="Next Slide"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className={styles.track}
        >
          {scrollingImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className={styles.card}>
              <div
                className={styles.imageContainer}
                onMouseEnter={() => {
                  popSound.stop();
                  popSound.play();
                }}
              >
                <img src={image.url} alt={`Gallery Candid ${image.id}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
