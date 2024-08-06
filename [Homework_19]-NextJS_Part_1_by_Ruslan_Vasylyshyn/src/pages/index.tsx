// pages/index.tsx
import Link from "next/link";
import styles from "../styles/App.module.css";

export default function Home() {
  return (
    <div>
      <h1 className={styles.header}>Welcome to the Avatar App</h1>
      <nav>
        <ul className={styles.welcomeButtonContainer}>
          <li>
            <Link href="/ssr" className={styles.welcomeButtons}>
              SSR Page
            </Link>
          </li>
          <li>
            <Link href="/ssg" className={styles.welcomeButtons}>
              SSG Page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
