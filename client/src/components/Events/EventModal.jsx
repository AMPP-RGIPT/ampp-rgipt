import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import styles from './EventModal.module.css';

export default function EventModal({
  show,
  onClose,
  editingEvent,
  formData,
  setFormData,
  onSubmit
}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (formData.imageFile) {
      const objectUrl = URL.createObjectURL(formData.imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [formData.imageFile]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose} data-lenis-prevent="true">
      <div 
        className={styles.modal} 
        onClick={e => e.stopPropagation()} 
        onWheel={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>

        <div className={styles.modalHeader}>
          <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <p>Fill in the details below to {editingEvent ? 'update the' : 'add a new'} event to the portal.</p>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGrid}>

            <div className={styles.formColumn}>
              <div className={styles.inputGroup}>
                <label>Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Annual Tech Symposium"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea
                  placeholder="Tell us about the event..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    required={formData.type !== 'Past'}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formColumn}>
              <div className={styles.inputGroup}>
                <label>Location / Venue</label>
                <input
                  type="text"
                  placeholder="Academic Block..."
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  required={formData.type !== 'Past'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Event Category</label>
                <div className={styles.typeSelector}>
                  <button
                    type="button"
                    className={formData.type === 'Upcoming' ? styles.activeType : ''}
                    onClick={() => setFormData({...formData, type: 'Upcoming'})}
                  >
                    Upcoming
                  </button>
                  <button
                    type="button"
                    className={formData.type === 'Past' ? styles.activeType : ''}
                    onClick={() => setFormData({...formData, type: 'Past'})}
                  >
                    Past
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>{formData.type === 'Past' ? 'Drive Link (Memories)' : 'Registration Link'}</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.registrationLink}
                  onChange={e => setFormData({...formData, registrationLink: e.target.value})}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Event Image</label>
                <div className={styles.uploadContainer}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFormData({...formData, imageFile: e.target.files[0]})}
                    className={styles.fileInput}
                  />
                  {(preview || formData.imageUrl) && (
                    <div className={styles.imagePreview}>
                      <img src={preview || formData.imageUrl} alt="Preview" />
                    </div>
                  )}
                </div>
                <p className={styles.helperText}>OR enter a direct image URL:</p>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value, imageFile: null})}
                />
              </div>

            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Discard Changes</button>
            <button type="submit" className={styles.submitBtn}>
              {editingEvent ? 'Save Updates' : 'Publish Event'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
