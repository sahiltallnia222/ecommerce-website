import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
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
      <div className=" relative h-[30vh] md:h-[70vh] w-[100%]">
      <Image src="/images/banner.webp" layout="fill" alt="banner image"/>
      </div>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
}
