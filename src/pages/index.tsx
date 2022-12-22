import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, refetch, isRefetching, isFetching, isLoading } =
    trpc.phrase.getRandomPhrase.useQuery(undefined, {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  const isFetchingPhrase = isFetching || isLoading || isRefetching;
  return (
    <div className="flex min-h-screen flex-col justify-around">
      <Head>
        <title>Random Phrases | Home</title>
      </Head>
      <main className="flex flex-col items-center justify-center gap-20 text-center text-2xl">
        <h1 className="text-4xl">Random Phrases</h1>
        <p className="text-lg">
          {data && !isFetchingPhrase ? data.phrase : "Loading..."}
        </p>
        <button onClick={() => refetch()} className="btn-secondary btn">
          Generate Phrase
        </button>
      </main>
      <Nav />
    </div>
  );
};

export default Home;
