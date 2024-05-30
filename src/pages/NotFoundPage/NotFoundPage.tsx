import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './styles.module.css';

function NotFoundPage() {
  return (
    <main className={styles.mainBlock}>
      <h1 className={styles.h1}>404 Not Found</h1>
      <h2 className={styles.h2}>The page you visited was not found. You may go to the home page.</h2>
      <Link className={styles.notFoundPageLink} to="/">
        <Button type="button" className={styles.page404}>
          Back to Home
        </Button>
      </Link>
    </main>
  );
}

export default NotFoundPage;
