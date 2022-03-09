import axios from "axios";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { useState, useEffect, FunctionComponent } from "react";
import styles from "../styles/Nameday.module.css";

export interface NameProps {
  date: string;
  name: string;
}

export const NameDay: FunctionComponent<NameProps> = (props) => {
  return (
    <>
      <div className={styles.name}>Dnes má svátek {props.name}</div>
    </>
  );
};