"use client";

import { NavContext } from "./app_wrapper";
import { useContext } from "react";
import { projectTabs } from "../constants";
import { FiExternalLink } from "react-icons/fi";
import styles from "./project_template.module.css";

interface Props {
  title: string;
  subTitle: string;
  projectDetail: {
    year: number;
    stack: string;
    github: string | null;
  };
  projectDescription: string;
  images?: {};
}

export default function ProjectTemplate(props: Props) {
  const onNavClick = useContext(NavContext);

  const getDetails = (
    <ul className={styles.details}>
      <li className={styles.row}>
        <div>Year</div>
        <div>{props.projectDetail.year}</div>
      </li>
      <li className={styles.row}>
        <div>Stack</div>
        <div>{props.projectDetail.stack}</div>
      </li>
      <li className={styles.row}>
        <div>Github</div>
        {props.projectDetail.github ? (
          <a href={props.projectDetail.github} target="_blank">
            <FiExternalLink />
          </a>
        ) : (
          <div>WIP</div>
        )}
      </li>
    </ul>
  );

  const getFooter = () => {
    let index = 0;
    for (let i = 0; i < projectTabs.length; ++i) {
      if (projectTabs[i].title == props.title) {
        index = i;
        break;
      }
    }

    return (
      <div className={styles.footer}>
        <div
          className={styles.navigate}
          onClick={() => {
            onNavClick(projectTabs[index - 1].path);
          }}
          style={{ display: `${index ? "block" : "none"}` }}
        >
          <div className={styles.italic}>Prev Project</div>
          <div>{index ? projectTabs[index - 1].title : ""}</div>
        </div>

        <div
          className={styles.navigate}
          onClick={() => {
            onNavClick(projectTabs[index + 1].path);
          }}
          style={{
            display: `${index < projectTabs.length - 2 ? "block" : "none"}`,
          }}
        >
          <div className={styles.italic}>Next Project</div>
          <div>
            {index < projectTabs.length - 1 ? projectTabs[index + 1].title : ""}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.title}>{props.title}</div>

        <div className={styles.pic_type_1}></div>

        <div className={styles.sub_title}>
          <div className={styles.title}>{props.subTitle}</div>
          <div className={styles.blank}></div>
        </div>

        <div className={styles.info}>
          {getDetails}
          <div className={styles.desc}>{props.projectDescription}</div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.gallery_row}>
            <div className={styles.pic_type_1}></div>
          </div>
          <div className={styles.gallery_row}>
            <div className={styles.pic_type_2}></div>
            <div className={styles.pic_type_2}></div>
          </div>
        </div>

        <div className={styles.footer}>{getFooter()}</div>
      </div>
    </main>
  );
}
