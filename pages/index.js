import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Online store</title>
        <meta
          name="description"
          content="Ecommerce Website - Online store for shopping"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border border-sky-500 ">Starting of the project</div>
      <div className="bg-[#762bc1]">THis is the next line</div>
    </div>
  );
}
