import React from 'react'; // eslint-disable-line no-unused-vars
import styles from './header.css';
import { Link } from 'react-router'; // eslint-disable-line no-unused-vars


const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.title}>Kantologist</h1>
      <nav>
        <ul className={styles.list}>
          <li className={styles.listitems}><Link className={styles.links} to="/about">About</Link></li>
          <li className={styles.listitems}><Link className={styles.links} to="/">Post</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
