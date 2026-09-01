import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './PastEvents.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

function PastEvents({ events, isAuthenticated, onEdit, onDelete, onToggleStatus }) {
  if (events.length === 0) return null;

  return (
    <section className={styles.pastEventsSection}>
      <div className={styles.editorialHeader}>
        <h2 className={styles.editorialTitle}>Past Events</h2>
      </div>

      <div className={styles.editorialGrid}>
        {events.map((event, index) => (
          <div
            key={event._id}
            className={`${styles.editorialItem} ${index % 2 !== 0 ? styles.editorialReverse : ''}`}
            style={{ willChange: 'transform, opacity' }}
            onMouseEnter={() => {
              popSound.stop();
              popSound.play();
            }}
          >
            <div className={styles.editorialMedia}>
              <img src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070'} alt={event.title} loading="lazy" />
              {isAuthenticated && (
                <div className={styles.editorialAdmin}>
                  <button onClick={() => onEdit(event)}>✏️</button>
                  <button onClick={() => onToggleStatus(event)}>⌛</button>
                  <button onClick={() => onDelete(event._id)}>🗑️</button>
                </div>
              )}
            </div>
            <div className={styles.editorialContent}>
              <span className={styles.editorialIndex}>{(index + 1).toString().padStart(2, '0')}</span>
              <h3 className={styles.editorialEventTitle}>{event.title}</h3>
              <p className={styles.editorialDesc}>{event.description}</p>
              <div className={styles.editorialMeta}>
                 <span>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              {event.registrationLink ? (
                <a 
                  href={event.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.readMore}
                  style={{ textDecoration: 'none' }}
                >
                  VIEW MEMORIES
                </a>
              ) : (
                <button className={styles.readMore}>VIEW MEMORIES</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(PastEvents);

