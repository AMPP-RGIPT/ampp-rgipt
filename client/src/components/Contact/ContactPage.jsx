import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Howl } from 'howler';
import styles from './ContactPage.module.css';
import api from '../../lib/api';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

gsap.registerPlugin(ScrollTrigger);


const teamContacts = [
  { name: "Test-1",      role: "Faculty Advisor",     email: "test-1@rgipt.ac.in",    phone: "+91-0000000000" },
  { name: "Test-2", role: "Chairman",           email: "test-2@rgipt.ac.in",  phone: "+91-0000000000" },
  { name: "Test-3",    role: "Co-Chairman",      email: "test-3@rgipt.ac.in",  phone: "+91-0000000000" },
  { name: "Test-4",           role: "Sec", email: "test-4@rgipt.ac.in",  phone: "+91-0000000000" },
];

export default function ContactPage() {
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const formRef     = useRef(null);
  const dividerRef  = useRef(null);
  const cardsRef    = useRef([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const getIsMobile = () => window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(getIsMobile());

    const query = window.matchMedia('(max-width: 768px)');
    const update = (e) => setIsMobile(e.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isMobile) {

      gsap.set(
        [eyebrowRef.current, titleRef.current, subtitleRef.current, formRef.current, dividerRef.current, ...cardsRef.current],
        { clearProps: 'all' }
      );
      return;
    }

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(eyebrowRef.current,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
        .fromTo(titleRef.current,    { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85 }, '-=0.5')
        .fromTo(subtitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7  }, '-=0.55')
        .fromTo(formRef.current,     { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9  }, '-=0.6');

      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: dividerRef.current, start: 'top 88%' } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out', delay: i * 0.08,
            clearProps: 'transform',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 80%' } }
        );
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await api.post('/contact', formData);


      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className={styles.page}>

      <section className={styles.topSection}>

        <span className={styles.watermark} aria-hidden="true">Contact</span>

        <div className={styles.inner}>

          <div className={styles.intro}>
            <p ref={eyebrowRef} className={styles.eyebrow}>Get in Touch</p>

            <h1 ref={titleRef} className={styles.title}>
              Let's build<br />
              something<br />
              <span className={styles.accent}>together.</span>
            </h1>

            <p ref={subtitleRef} className={styles.subtitle}>
              Have questions or ready to collaborate with our chapter on advanced
              materials and corrosion engineering?
            </p>

            {/* decorative vertical rule — same as Hero card bar */}
            <div className={styles.sideRule} aria-hidden="true" />
          </div>

          {/* RIGHT: form */}
          <div ref={formRef} className={styles.formWrap}>
            <form className={styles.form} onSubmit={handleSubmit}>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name"
                       className={styles.input} required
                       value={formData.name} onChange={handleChange} />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Email address"
                       className={styles.input} required
                       value={formData.email} onChange={handleChange} />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea id="message" placeholder="How can we help?"
                          className={styles.textarea} rows="5" required
                          value={formData.message} onChange={handleChange} />
              </div>

              <button type="submit" className={styles.submit} disabled={status.loading}>
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>

              {status.success && (
                <p className={styles.successMsg}>✓ Message sent successfully!</p>
              )}
              {status.error && (
                <p className={styles.errorMsg}>{status.error}</p>
              )}

            </form>
          </div>

        </div>
      </section>

      {/* ══ DIVIDER: gradient rule matching Hero bottom / Team top ══ */}
      <div className={styles.sectionBridge} aria-hidden="true">
        <div ref={dividerRef} className={styles.gradientRule} />
      </div>

      {/* ══ CONTACT CARDS SECTION ══ */}
      <section className={styles.bottomSection}>

        <div className={styles.bottomInner}>
          <p className={styles.eyebrow} style={{ textAlign: 'center', marginBottom: '8px' }}>
            Direct Contact
          </p>
          <h2 className={styles.bottomHeading}>
            Reach our <span className={styles.accent}>leadership</span>
          </h2>

          <div className={styles.cardsGrid}>
            {teamContacts.map((c, i) => (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className={styles.card}
                onMouseEnter={() => {
                  popSound.stop();
                  popSound.play();
                }}
              >

                <span className={styles.rolePill}>{c.role}</span>

                <h3 className={styles.personName}>{c.name}</h3>

                <div className={styles.details}>
                  <a href={`mailto:${c.email}`} className={styles.detailRow}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>{c.email}</span>
                  </a>
                  <a href={`tel:${c.phone}`} className={styles.detailRow}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>{c.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
