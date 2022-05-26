import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div className=" relative">
      <Head>
        <title>Online store</title>
        <meta
          name="description"
          content="Ecommerce Website - Online store for shopping"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="96x96" href="images/favicon-96x96.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
      </Head>
      <Navbar/>
      <div className=" relative h-[30vh] md:h-[70vh] w-[100%]">
      <Image src="/images/home.jpg" layout="fill" alt="banner image"/>
      </div>
      <Footer/>
    </div>
  );
}
