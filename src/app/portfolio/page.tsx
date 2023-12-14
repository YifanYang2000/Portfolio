"use client";

import { useContext, useState } from "react";
import { NavContext } from "../../components/app_wrapper";
import { primaryColor, projectTabs } from "../../constants";
import styles from "./page.module.css";

export default function Portfolio() {
  const onNavClick = useContext(NavContext);
  const [hover, setHover] = useState<number | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [contentStyle, setContentStyle] = useState<{ backgroundColor: string }>(
    { backgroundColor: primaryColor }
  );

  const getTabs = (firstCol: boolean) => {
    const half = projectTabs.length / 2;
    const tabs = firstCol
      ? projectTabs.slice(0, half + (projectTabs.length % 2))
      : projectTabs.slice(0 - half);

    return (
      <ul className={styles.tab_list}>
        {tabs.map((tab, index) => (
          <li
            className={
              styles["tab"] +
              " " +
              `${tab.IP ? "" : styles["pointer"]}` +
              " " +
              `${hover != null ? styles["out_focus"] : ""}`
            }
            key={index}
            onClick={() => {
              if (!tab.IP) {
                setClicked(true);
                onNavClick(tab.path);
              }
            }}
            onMouseOver={() => {
              if (!clicked) {
                setHover(index);
                setContentStyle({
                  backgroundColor: tab.temp_bg,
                });
              }
            }}
            onMouseOut={() => {
              if (!clicked) {
                setHover(null);
                setContentStyle({
                  backgroundColor: primaryColor,
                });
              }
            }}
          >
            {tab.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.content} style={contentStyle}>
        <div className={styles.list}>{getTabs(true)}</div>
        <div className={styles.list}>{getTabs(false)}</div>
      </div>
    </main>
  );
}
