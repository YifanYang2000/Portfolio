import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { modalAnimationDuration } from "../constants";

interface Props {
  picture?: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function Modal(props: Props) {
  const [modalStyle, setModalStyle] = useState<{
    bg: {
      opacity: string;
      cursor: string;
    };
    img: {
      opacity: string;
    };
  }>({
    bg: {
      opacity: "0",
      cursor: "default",
    },
    img: {
      opacity: "0",
    },
  });

  useEffect(() => {
    setModalStyle({
      bg: {
        opacity: "0.75",
        cursor: "pointer",
      },
      img: {
        opacity: "1",
      },
    });
  }, []);

  return (
    <div className={styles.modal}>
      <div
        className={styles.bg}
        onClick={() => {
          setModalStyle({
            bg: {
              opacity: "0",
              cursor: "default",
            },
            img: {
              opacity: "0",
            },
          });
          setTimeout(() => {
            props.setOpenModal(false);
          }, modalAnimationDuration);
        }}
        style={modalStyle.bg}
      ></div>
      <div className={styles.picture} style={modalStyle.img}>
        {/* <Image src={} alt=""/> */}
      </div>
    </div>
  );
}
