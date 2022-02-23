import { useState, useEffect, FunctionComponent } from "react";

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
      <div>{date.toLocaleDateString()}</div>
      <div>{date.toLocaleTimeString()}</div>
    </>
  );
};
