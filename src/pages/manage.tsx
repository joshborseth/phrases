import { Phrase } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";
import { trpc } from "../utils/trpc";

const Manage: NextPage = () => {
  const [page, setPage] = useState(0);
  const { data, fetchNextPage, error, isLoading, isFetchingNextPage } =
    trpc.phrase.getAllPhrases.useInfiniteQuery(
      {
        limit: 4,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const handleFetchNextPage = () => {
    fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  // data will be split in pages
  const toShow = data?.pages[page]?.items;
  const loading = isLoading || isFetchingNextPage;
  return (
    <div className="flex min-h-screen flex-col justify-start pb-80 md:pb-0">
      <Head>
        <title>Random Phrases | Manage Phrases</title>
      </Head>
      <main className="text-center text-lg">
        <h1 className="py-10 text-4xl">Manage Phrases</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2">
          {toShow?.map((phrase) => (
            <Phrase key={phrase.id} phrase={phrase} />
          ))}
          {error && <p className="col-span-3">{error.message}</p>}
          {loading && <p className="col-span-3">Loading...</p>}
        </section>
        <div className="flex w-full justify-center gap-5">
          <button onClick={() => handleFetchPreviousPage()} className="btn-warning btn">
            Previous
          </button>
          <button onClick={() => handleFetchNextPage()} className="btn-success btn">
            Next
          </button>
        </div>
      </main>
      <Nav />
    </div>
  );
};

export default Manage;

const Phrase = ({ phrase }: { phrase: Phrase }) => {
  const utils = trpc.useContext();
  const { mutate } = trpc.phrase.deletePhrase.useMutation({
    onSuccess: () => {
      utils.phrase.invalidate();
    },
  });
  return (
    <article className="m-10 flex items-center justify-between gap-5 rounded border-2 p-4 text-left">
      <p>{phrase.phrase}</p>
      <button className="btn-error btn h-10 w-10" onClick={() => mutate(phrase.id)}>
        X
      </button>
    </article>
  );
};
