import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Random Phrases</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-20 py-20 text-center">
        <h1 className="text-4xl">Random Phrases</h1>
        <p className="text-xl"></p>
        <button className="rounded-xl border-2 px-4 py-2 text-2xl transition-transform hover:scale-105">
          Generate Phrase
        </button>
        <Link href="/contribute" className="absolute top-5 left-5">
          Contribute a Phrase
        </Link>
      </main>
    </>
  );
};

export default Home;
