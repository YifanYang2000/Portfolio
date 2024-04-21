"use client";

import { useContext, useState } from "react";
import { MobileContext } from "../../components/app_wrapper";
import { socials, email } from "../../constants";
import styles from "./page.module.css";

export default function Contact() {
  const isMobile = useContext(MobileContext);
  const [hover, setHover] = useState<string | null>(null);
  const resumeLocation = "/Yifan_Resume.pdf";

  const getTab = (
    name: string,
    link: string,
    key: number | null,
    mail: boolean
  ) => {
    return (
      <a
        className={
          styles["tab"] +
          " " +
          `${hover != null && hover != name ? styles["out_focus"] : ""}`
        }
        onClick={() => {
          if (mail) window.open("mailto:yifan.yang@hotmail.ca");
        }}
        onMouseOver={() => {
          if (!isMobile) setHover(name);
        }}
        onMouseOut={() => {
          if (!isMobile) setHover(null);
        }}
        href={mail ? "#" : link}
        key={key}
        target={mail ? "_self" : "_blank"}
      >
        {name}
        {name == "Instagram" ? <span className={styles.meme}> (I welcome memes)</span> : null}
      </a>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.title}>Email</div>
          <div className={styles.links}>{getTab(email, email, null, true)}</div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>Socials</div>
          <div className={styles.links}>
            {socials.map((social, index) =>
              getTab(social.type, social.link, index, false)
            )}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>Locations</div>
          <div className={styles.links}>
            {getTab("Montreal", "https://maps.app.goo.gl/pdHG9W1wJD8PgUS26", null, false)}
            {getTab("Toronto", "https://maps.app.goo.gl/2amC2GWhmDoSX5fE8", null, false)}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>More</div>
          <div className={styles.links}>
            {getTab("Resume", resumeLocation, null, false)}
          </div>
        </div>
      </div>
    </main>
  );
}
