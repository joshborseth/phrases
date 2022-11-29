import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading, refetch, isRefetching } =
    trpc.phrase.getRandomPhrase.useQuery();
  return (
    <>
      <Head>
        <title>Random Phrases | Home</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-20 py-20 text-center">
        <h1 className="text-4xl">Random Phrases</h1>
        {data && !isLoading && !isRefetching && (
          <p className="text-xl">{data.phrase}</p>
        )}
        {isLoading || (isRefetching && <p className="text-xl">Loading...</p>)}
        {error && (
          <p className="text-xl text-red-500">
            An error occurred while fetching a phrase. {error.message}
          </p>
        )}
        <button
          onClick={() => {
            refetch();
          }}
          className="rounded-xl border-2 px-4 py-2 text-2xl transition-transform hover:scale-105"
        >
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
