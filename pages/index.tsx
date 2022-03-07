import axios from "axios";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ColorComponent } from "../components/colors.component";
import { NameProps } from "../components/nameday.component";
import { Time } from "../components/time.component";
import { WeatherComponent } from "../components/weather.component";
import styles from "../styles/Home.module.css";

const Home: NextPage<NameProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Office Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Time date={props.date} name={props.name} />
          </div>
          <div className={styles.card}>
            <WeatherComponent />
          </div>
          <div className={styles.card}>
            <ColorComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<NameProps>> => {
  const nameday = await axios
    .get<NameProps[]>("https://svatky.adresa.info/json")
    .then((data) => data.data);
  if (!nameday[0]) {
    throw Error("No Name fetched!");
  }
  return {
    revalidate: 60,
    props: {
      date: nameday[0].date,
      name: nameday[0].name,
    },
  };
};

export default Home;
