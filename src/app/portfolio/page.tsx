"use client";

import { useContext } from "react";
import { NavContext } from "../../components/app_wrapper";
import styles from "./page.module.css";

export default function Portfolio() {
  const onNavClick = useContext(NavContext);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        Portfolio
        <div
          onClick={() => {
            onNavClick("/portfolio/website");
          }}
        >
          Go to website project page
        </div>
      </div>
    </main>
  );
}
