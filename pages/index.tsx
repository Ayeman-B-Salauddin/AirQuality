import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/Navbar";

export const baseUrl = "https://car-data.p.rapidapi.com";

export const getData = async (url: any) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_APP_RAPID_API_KEY ?? "",
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    },
  });
  return data;
};

export const getStaticProps: GetStaticProps = async () => {
  const cars = await getData(`${baseUrl}/cars?limit=50&page=0`);

  return {
    props: {
      cars: cars,
    },
  };
};

const Home: NextPage = ({ cars }: any) => {
  console.log(cars);
  return (
    <>
      <Head>
        <title>Car Trader</title>
        <meta name="description" content="Trade your car" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <div>
        {Object.keys(cars).map((key, i) => (
          <li key={i}>{cars[key].make}</li>
        ))}
      </div>
    </>
  );
};

export default Home;
