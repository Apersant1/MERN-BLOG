import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({user,additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={'e'} alt={user.fullname} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{user.fullname}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>

    </div>
  );
};
