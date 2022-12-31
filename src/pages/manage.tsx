import { Phrase } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Loading from "../components/Loading";
import { trpc } from "../utils/trpc";

const Manage: NextPage = () => {
  const { data, fetchNextPage, hasNextPage, error, isLoading, isFetchingNextPage } =
    trpc.phrase.getAllPhrases.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  // data will be split in pages
  const loading = isLoading || isFetchingNextPage;
  return (
    <>
      <Head>
        <title>Random Phrases | Manage Phrases</title>
      </Head>
      <main className="flex min-h-screen flex-col justify-center text-center text-lg">
        <h1 className="pt-32 pb-10 text-4xl">Manage Phrases</h1>
        <section className="grid grid-cols-1 py-10 sm:grid-cols-2">
          {data?.pages?.map((page) =>
            page.items.map((phrase) => <Phrase key={phrase.id} phrase={phrase} />)
          )}
          {error && <p className="col-span-3">{error.message}</p>}
          {loading && (
            <div className="flex w-screen justify-center">
              <Loading />
            </div>
          )}
        </section>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="btn-secondary btn mx-auto my-10"
          >
            Load More
          </button>
        )}
      </main>
    </>
  );
};

export default Manage;

const Phrase = ({ phrase }: { phrase: Phrase }) => {
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.phrase.deletePhrase.useMutation({
    onSuccess: () => {
      utils.phrase.invalidate();
    },
  });
  return (
    <article className="mx-5 my-2 flex items-center justify-between gap-5 rounded border-2 p-4 text-left lg:mx-16">
      <p>{phrase.phrase}</p>
      <button
        className="btn-error btn h-10 w-10"
        disabled={isLoading}
        onClick={() => mutate(phrase.id)}
      >
        X
      </button>
    </article>
  );
};
