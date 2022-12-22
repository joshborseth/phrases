import { Phrase } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import { trpc } from "../utils/trpc";

const Manage: NextPage = () => {
  const { data, isLoading, error } = trpc.phrase.getAllPhrases.useQuery();
  return (
    <div className="flex min-h-screen flex-col justify-around">
      <Head>
        <title>Random Phrases | Manage Phrases</title>
      </Head>
      <main className="text-center text-lg">
        <h1 className="py-10 text-4xl">Manage Phrases</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2">
          {data &&
            data.map((phrase) => {
              return <Phrase key={phrase.id} phrase={phrase} />;
            })}
          {error && <p className="col-span-3">{error.message}</p>}
          {isLoading && <p className="col-span-3">Loading...</p>}
        </section>
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
