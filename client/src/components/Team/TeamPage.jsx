import React from 'react';
import Members from './Members';
import styles from './TeamPage.module.css';

const TeamPage = () => {
  return (
    <div className={styles.page}>
      <Members />
    </div>
  );
};

export default TeamPage;
