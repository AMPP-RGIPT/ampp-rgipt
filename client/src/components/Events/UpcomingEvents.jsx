import React, { memo } from 'react';
import { Howl } from 'howler';
import styles from './UpcomingEvents.module.css';

const popSound = new Howl({
  src: ['/sounds/pop.wav'],
  volume: 0.35,
  preload: true
});

function UpcomingEvents({ events, isAuthenticated, onEdit, onDelete, onToggleStatus }) {
  if (events.length === 0) return null;

  const heroEvent = events[0];
  const otherUpcoming = events.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.mainTitleWrapper}>
        <h2 className={styles.mainTitle}>Upcoming Events</h2>
      </div>

      {heroEvent && (
        <section
          className={styles.heroSection}
          onMouseEnter={() => {
            popSound.stop();
            popSound.play();
          }}
        >
          <div className={styles.heroImageWrapper} style={{ willChange: 'transform, opacity' }}>
            <img 
              src={heroEvent.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'} 
              alt={heroEvent.title} 
              loading="lazy"
            />
            {isAuthenticated && (
              <div className={styles.heroAdminActions}>
                <button onClick={() => onEdit(heroEvent)}>✏️</button>
                <button onClick={() => onDelete(heroEvent._id)}>🗑️</button>
              </div>
            )}
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroInfo}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Date</span>
                <span className={styles.infoValue}>{new Date(heroEvent.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className={styles.infoSeparator}></div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Venue</span>
                <span className={styles.infoValue}>{heroEvent.location}</span>
              </div>
              <div className={styles.infoSeparator}></div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>Time</span>
                <span className={styles.infoValue}>{heroEvent.time}</span>
              </div>
            </div>

            <h2 className={styles.heroTitle}>{heroEvent.title}</h2>
            <p className={styles.heroDesc}>{heroEvent.description}</p>

            {heroEvent.registrationLink && (
              <a href={heroEvent.registrationLink} target="_blank" rel="noopener noreferrer" className={styles.heroRegisterBtn}>
                Register Now
              </a>
            )}
          </div>
        </section>
      )}

      {otherUpcoming.length > 0 && (
        <>
          <div className={styles.sectionTitle}>
            <h2>Upcoming Events</h2>
          </div>
          <div className={styles.eventsGrid}>
            {otherUpcoming.map(event => (
              <div
                key={event._id}
                className={styles.eventCard}
                style={{ willChange: 'transform, opacity' }}
                onMouseEnter={() => {
                  popSound.stop();
                  popSound.play();
                }}
              >
                {event.imageUrl && (
                  <div className={styles.eventImage}>
                    <img src={event.imageUrl} alt={event.title} loading="lazy" />
                  </div>
                )}
                <div className={styles.eventBadge}>{event.type}</div>

                {isAuthenticated && (
                  <div className={styles.adminCardActions}>
                    <button onClick={() => onEdit(event)} title="Edit">✏️</button>
                    <button onClick={() => onToggleStatus(event)} title="Mark as Past">⌛</button>
                    <button onClick={() => onDelete(event._id)} title="Delete">🗑️</button>
                  </div>
                )}

                <div className={styles.eventContent}>
                  <h3>{event.title}</h3>
                  <div className={styles.eventMeta}>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className={styles.separator}>|</span>
                    <span>{event.time}</span>
                  </div>
                  <p>{event.description}</p>
                  {event.registrationLink && (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className={styles.registerBtn}>
                      Register Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(UpcomingEvents);

