import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (<header className={styles.header}>
    <div className={`container ${styles.header__container}`}>
      <a href="/" className={styles.header__logo}>Labs</a>
      <nav className={styles.navbar}>
        <ul className={styles.navbar__list}>
          <li className={styles.navbar__item}>
            <a href="/">1</a>
          </li>
          <li className={styles.navbar__item}>
            <a href="/lab2">2</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>);
};

export default Header;
