import React, { useState, useEffect, useMemo, memo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../../lib/useLenis';

import api from '../../lib/api';
import styles from './EventsPage.module.css';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import EventModal from './EventModal';
import LoginModal from './LoginModal';
import SetupModal from './SetupModal';

function EventsPage() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [pendingUsername, setPendingUsername] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    time: '',
    type: 'Upcoming',
    registrationLink: '',
    imageUrl: '',
    imageFile: null
  });


  useEffect(() => {
    fetchEvents();
    verifyToken();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [events]);


  const verifyToken = async () => {
    try {
      const response = await api.get('/auth/verify');
      if (response.data.success) {
        if (response.data.user && response.data.user.isSetup === false) {
          setIsAuthenticated(false);
          setPendingUsername(response.data.user.username);
          setShowSetupModal(true);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };


  useEffect(() => {
    const isAnyModalOpen = showModal || showLoginModal || showSetupModal;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      getLenis()?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      getLenis()?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      getLenis()?.start();
    };
  }, [showModal, showLoginModal, showSetupModal]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAccess = () => {
    setShowLoginModal(true);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });

      const data = response.data;

      if (data.success) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        if (data.setupRequired) {
          setPendingUsername(data.username);
          setShowLoginModal(false);
          setShowSetupModal(true);
        } else {
          setIsAuthenticated(true);
          setShowLoginModal(false);
        }
      } else {
        throw new Error(data.message || 'Unauthorized');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSetupSuccess = () => {
    setIsAuthenticated(true);
    setShowSetupModal(false);
  };


  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error logging out from server:', error);
    }
  };



  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date.includes('T') ? event.date.split('T')[0] : event.date,
        location: event.location,
        time: event.time || '',
        type: event.type,
        registrationLink: event.registrationLink || '',
        imageUrl: event.imageUrl || '',
        imageFile: null
      });

    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        time: '',
        type: 'Upcoming',
        registrationLink: '',
        imageUrl: '',
        imageFile: null
      });

    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'imageFile' && formData[key]) {
        data.append('image', formData[key]);
      } else if (key !== 'imageFile') {
        data.append(key, formData[key]);
      }
    });

    try {
      let response;
      if (editingEvent) {
        response = await api.put(`/events/${editingEvent._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await api.post('/events', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }


      if (response.status === 200 || response.status === 201) {
        fetchEvents();
        setShowModal(false);
      }

    } catch (error) {
      console.error('Error saving event:', error);
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await api.delete(`/events/${id}`);
        if (response.status === 200) fetchEvents();

      } catch (error) {

        console.error('Error deleting event:', error);
      }
    }
  };

  const toggleStatus = async (event) => {
    const newType = event.type === 'Upcoming' ? 'Past' : 'Upcoming';
    try {
      const response = await api.put(`/events/${event._id}`,
        { ...event, type: newType }
      );

      if (response.status === 200) fetchEvents();
    } catch (error) {

      console.error('Error updating status:', error);
    }
  };

  const upcomingEvents = useMemo(() =>
    events.filter(e => e.type === 'Upcoming').sort((a, b) => new Date(a.date) - new Date(b.date)),
    [events]
  );
  const pastEvents = useMemo(() =>
    events.filter(e => e.type === 'Past').sort((a, b) => new Date(b.date) - new Date(a.date)),
    [events]
  );

  return (
    <div className={styles.page}>
      <div className={styles.verticalLines} style={{ willChange: 'opacity' }}>
        <span></span><span></span><span></span><span></span>
      </div>

      <div className={styles.adminTrigger}>
        {!isAuthenticated ? (
          <button onClick={handleAdminAccess} className={styles.adminBtnSmall}>Manage Events</button>
        ) : (
          <div className={styles.adminControls}>
            <button onClick={() => handleOpenModal()} className={styles.addBtn}>+ Add Event</button>
            <button onClick={handleLogout} className={styles.logoutBtn}>Exit Admin</button>
          </div>
        )}
      </div>

      <div className={styles.container}>
        {loading ? (
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonHero}>
              <div className={`${styles.skeletonImage} ${styles.pulse}`}></div>
              <div className={styles.skeletonHeroContent}>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '60%', height: '3rem', marginBottom: '1.5rem' }}></div>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '40%', height: '1.5rem', marginBottom: '2.5rem' }}></div>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '100%', height: '1rem', marginBottom: '0.8rem' }}></div>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '90%', height: '1rem', marginBottom: '0.8rem' }}></div>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '80%', height: '1rem', marginBottom: '2.5rem' }}></div>
                <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '160px', height: '45px', borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div className={styles.skeletonGrid}>
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={`${styles.skeletonImageSm} ${styles.pulse}`}></div>
                  <div className={styles.skeletonCardContent}>
                    <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '80%', height: '1.5rem', marginBottom: '1rem' }}></div>
                    <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '100%', height: '1rem', marginBottom: '0.5rem' }}></div>
                    <div className={`${styles.skeletonText} ${styles.pulse}`} style={{ width: '90%', height: '1rem' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <UpcomingEvents
              events={upcomingEvents}
              isAuthenticated={isAuthenticated}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />

            {upcomingEvents.length > 0 && pastEvents.length > 0 && (
              <div className={styles.sectionSpacer}></div>
            )}

            <PastEvents
              events={pastEvents}
              isAuthenticated={isAuthenticated}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />

            {!loading && events.length === 0 && <div className={styles.noEvents}>No events found.</div>}
          </>
        )}
      </div>

      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        editingEvent={editingEvent}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <SetupModal
        show={showSetupModal}
        onClose={() => {
          setShowSetupModal(false);
          handleLogout();
        }}
        username={pendingUsername}
        onSetupSuccess={handleSetupSuccess}
      />
    </div>

  );
}

export default memo(EventsPage);

