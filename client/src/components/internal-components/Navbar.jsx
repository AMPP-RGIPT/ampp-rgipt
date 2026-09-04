import React, { useState, useEffect, useLayoutEffect, useRef, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import styles from './Navbar.module.css';
import amppImg from '../../assets/ampp.png';
import { smoothScrollTo } from '../../lib/useLenis';

const NAV_LINKS = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Team', href: '/team', type: 'route' },
  { label: 'Events', href: '/events', type: 'route' },
  { label: 'Contact', href: '/contact', type: 'route' },
];

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const pillRef = useRef(null);
  const linkRefs = useRef([]);
  const hamburgerRef = useRef(null);

  const isMobileBreakpoint = () =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 540px)").matches
      : false;

  const [isMobile, setIsMobile] = useState(isMobileBreakpoint);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 540px)");
    const update = (e) => setIsMobile(e.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      gsap.set([logoRef.current, pillRef.current, hamburgerRef.current, ...linkRefs.current], { clearProps: "all" });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(pillRef.current, { opacity: 0, y: -22 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.15 })
        .fromTo(logoRef.current, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.65")
        .fromTo(hamburgerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.65")
        .fromTo(linkRefs.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" }, "-=0.45");
    });

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);


  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, link) => {
    const { label, href, type } = link;
    closeMenu();

    if (type === 'anchor') {
      e.preventDefault();
      if (location.pathname === '/') {
        smoothScrollTo(href, -80);
      } else {
        navigate('/');
        setTimeout(() => {
          smoothScrollTo(href, -80);
        }, 100);
      }
    } else if (label === 'Home' && location.pathname === '/') {
      e.preventDefault();
      smoothScrollTo('#home', -80);
    }
  };

  return (
    <>
      <header className={styles.wrapper} role="banner" style={{ willChange: 'transform' }}>
        <Link
          ref={logoRef}
          to="/"
          className={styles.logo}
          aria-label="Go to homepage"
          onClick={(e) => handleNavClick(e, { label: 'Home', href: '/', type: 'route' })}
          style={{ willChange: 'opacity, transform' }}
        >
          <img src={amppImg} alt="AMPP logo" loading="lazy" />
        </Link>
        <nav aria-label="Main navigation">
          <ul ref={pillRef} className={styles.nav} style={{ willChange: 'opacity, transform' }}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  ref={el => linkRefs.current[i] = el}
                  to={link.type === 'route' ? link.href : '/'}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{ willChange: 'opacity, transform' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ willChange: 'opacity, transform' }}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </header>
      <nav id="mobile-menu" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <ul className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link to={link.type === 'route' ? link.href : '/'} onClick={(e) => handleNavClick(e, link)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default memo(Navbar);

