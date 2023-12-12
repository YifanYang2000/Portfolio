import styles from "./portoflio_template.module.css";

interface Props {
  test: string;
}

export default function PortfolioTemplate(props: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.content}>{props.test}</div>
    </main>
  );
}
