import Landing from "./Landing";
import Head from "next/head";
import Footer from "../components/Footer"

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Landing/>

    </>
  );
}