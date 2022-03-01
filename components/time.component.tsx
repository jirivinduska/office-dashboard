import { useState, useEffect, FunctionComponent } from "react";
import styles from "../styles/Time.module.css";

export const Time: FunctionComponent<{}> = () => {
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
      <h3>{date.toLocaleDateString('cs-CZ')}</h3>
      <h1>{date.toLocaleTimeString('cs-CZ')}</h1>
      </div>
    </>
  );
};
