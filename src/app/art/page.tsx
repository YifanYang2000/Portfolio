"use client";

import Modal from "../../components/modal";
import { useState } from "react";
import styles from "./page.module.css";

export default function Art() {
  const sketches = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
  ];
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getArt = () => {
    const artPerRow = 3;
    const rows = [];
    for (let i = 0; i < sketches.length; i += artPerRow)
      rows.push(sketches.slice(i, i + artPerRow));

    return (
      <div className={styles.gallery}>
        {rows.map((row, i) => (
          <div className={styles.artRow} key={i}>
            {row.map((sketch, j) => (
              <div
                className={styles.canvas}
                key={j}
                onClick={() => {
                  setOpenModal(true);
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {openModal ? <Modal setOpenModal={setOpenModal} /> : null}
        {getArt()}
      </div>
    </main>
  );
}
