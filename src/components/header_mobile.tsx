import Image from "next/image";
import signature from "../resources/Signature.png";
import { logoSizeSmall, mobileSize } from "../constants";
import { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";
import styles from "./header_mobile.module.css";

interface Props {
  onNavClick: (path: string) => void;
  setIsMobileNavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderMobile(props: Props) {
  const pathname = usePathname();

  return (
    <div
      className={
        styles["header"] +
        " " +
        `${pathname == "/" ? styles["transparent"] : styles["visible"]}`
      }
    >
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
        onClick={() => {
          props.setIsMobileNavOpen(true);
        }}
      >
        <IconContext.Provider value={{ className: styles.open_mobile_nav }}>
          <FiMenu />
        </IconContext.Provider>
      </div>
    </div>
  );
}
