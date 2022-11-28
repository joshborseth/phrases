import Head from "next/head";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
const Contribute = () => {
  const [isDone, setIsDone] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const postPhrase = trpc.phrase.createPhrase.useMutation({
    onSuccess: () => {
      if (inputRef.current?.value) inputRef.current.value = "";
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
      }, 1000);
    },
    onError: () => {
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
      }, 1000);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phrase = inputRef.current?.value;
    if (phrase && phrase.length > 0) {
      postPhrase.mutate({ phrase });
    }
  };
  return (
    <>
      <Head>
        <title>Random Phrases | Contribute</title>
      </Head>
      <form
        className="flex min-h-screen flex-col items-center justify-center gap-20 text-center text-3xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="phrase">Phrase:</label>
        <textarea
          placeholder="Type a Phrase..."
          ref={inputRef}
          name="phrase"
          className="h-80 resize-none p-2 text-black"
        />
        <div className="flex gap-5">
          <button className="rounded-xl border-2 px-4 py-2" type="submit">
            Submit
          </button>
          <Link href="/" className="rounded-xl border-2 px-4 py-2">
            Back
          </Link>
        </div>
        <Toast isSuccess={postPhrase.isSuccess} isDone={isDone} />
      </form>
    </>
  );
};

export default Contribute;

const Toast = ({
  isDone,
  isSuccess,
}: {
  isDone?: boolean;
  isSuccess?: boolean;
}) => {
  return (
    <div
      className={`absolute top-5 right-5 rounded p-5 text-xl ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      } ${isDone ? "opacity-100" : "opacity-0"} transition-opacity`}
    >
      {isSuccess ? "Phrase Submitted!" : "Error Submitting Phrase"}
    </div>
  );
};
