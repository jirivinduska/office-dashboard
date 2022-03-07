import { useState, useEffect, FunctionComponent } from "react";
import styles from "../styles/Time.module.css";
import { NameDay, NameProps } from "./nameday.component";

export const Time: FunctionComponent<NameProps> = (props) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const date = new Date(time);

  return (
    <>
      <div className={styles.clock}>
        <div className={styles.date}>{date.toLocaleDateString("cs-CZ")}</div>
        <NameDay date={props.date} name={props.name} />
        <div className={styles.time}>{date.toLocaleTimeString("cs-CZ")}</div>
      </div>
    </>
  );
};
