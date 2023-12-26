import Image from "next/image";
import signature from "../resources/Signature.png";
import {
  logoSizeSmall,
  mobileSize,
  spotifyCompact,
  spotifyNormal,
  tabs,
} from "../constants";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { FiX } from "react-icons/fi";
import styles from "./navigation.module.css";

interface Props {
  isMobile: boolean;
  isMobileNavOpen: boolean;
  nextPathName: string;
  onNavClick: (path: string) => void;
  setIsMobileNavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navigation(props: Props) {
  const getTabs = () => {
    return (
      <ul className={styles.tab_list}>
        {tabs.map((tab, index) => (
          <li
            className={
              styles["tab"] +
              " " +
              `${
                props.nextPathName == tab.path ||
                (tab.path != "/" && props.nextPathName.includes(tab.path))
                  ? styles["tab_active"]
                  : styles["tab_inactive"]
              }`
            }
            key={index}
            onClick={() => {
              props.onNavClick(tab.path);
            }}
          >
            <div className={styles.title}>{tab.title}</div>
            <div>{tab.desc}</div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className={
        styles["navigation_wrapper"] +
        " " +
        `${
          props.isMobileNavOpen
            ? styles["show_mobile_nav"]
            : styles["hide_mobile_nav"]
        }`
      }
    >
      <div className={styles.navigation}>
        <nav className={styles.navigate}>
          <div className={styles.header}>
            <div
              className={styles.logo}
              onClick={() => {
                props.onNavClick("/");
              }}
            >
              <Image
                src={signature}
                alt="signature logo"
                sizes={`(max-width: ${mobileSize}px) ${logoSizeSmall}px`}
                fill={true}
              />
            </div>
            <div
              className={styles.close_mobile_nav}
              onClick={() => {
                props.setIsMobileNavOpen(false);
              }}
            >
              <IconContext.Provider
                value={{ className: styles.close_mobile_nav }}
              >
                <FiX />
              </IconContext.Provider>
            </div>
          </div>
          {getTabs()}
        </nav>

        <div className={styles.music}>
          <div className={styles.title}>CURRENT MOOD</div>
          <iframe
            src="https://open.spotify.com/embed/track/104EutLydSehDHiEjmtdBo?utm_source=generator&theme=0"
            width="100%"
            height={`${props.isMobile ? spotifyCompact : spotifyNormal}`}
            allow="clipboard-write; encrypted-media; fullscreen;
              picture-in-picture"
            loading="lazy"
            style={{ border: "0" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
