import axios from "axios";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { useState, useEffect, FunctionComponent } from "react";
import styles from "../styles/Nameday.module.css";

interface NameProps {
  date?: string;
  name?: string;
}

export const NameDay: FunctionComponent<NameProps> = (props) => {
  return (
    <>
      <div className={styles.name}>Dnes má svátek {props.name}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<NameProps>> => {
  const nameday = await axios
    .get<NameProps[]>("svatky.adresa.info/json")
    .then((data) => data.data);
  if (!nameday[0]) {
    throw Error("No Name fetched!");
  }
  return {
    revalidate: 3600,
    props: {
      date: nameday[0].date,
      name: nameday[0].name,
    },
  };
};

export default NameDay;
