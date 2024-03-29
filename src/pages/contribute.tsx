import Head from "next/head";
import { type FormEvent, useRef, useState } from "react";
import { trpc } from "../utils/trpc";
const Contribute = () => {
  const [isDone, setIsDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showToast = () => {
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
    }, 1000);
  };
  const postPhrase = trpc.phrase.createPhrase.useMutation({
    onSuccess: () => {
      if (inputRef.current?.value) inputRef.current.value = "";
      showToast();
    },
    onError: () => {
      showToast();
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phrase = inputRef.current?.value;
    if (phrase && phrase.length > 0) {
      postPhrase.mutate({
        phrase,
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col justify-around">
      <Head>
        <title>Random Phrases | Contribute</title>
      </Head>
      <main className="flex flex-col items-center justify-center">
        <h1 className="py-20 text-4xl">Contribute a Phrase</h1>
        <form
          className="flex flex-col items-center justify-center gap-20"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label htmlFor="phrase" className="m-4 text-lg">
              Phrase:
            </label>
            <input
              placeholder="Type a Phrase..."
              ref={inputRef}
              name="phrase"
              className="input-bordered input resize-none"
            />
          </div>
          <button className="btn-primary btn" type="submit">
            Submit
          </button>
        </form>
        <Alert isSuccess={postPhrase.isSuccess} isDone={isDone} />
      </main>
    </div>
  );
};

export default Contribute;

const Alert = ({ isDone, isSuccess }: { isDone?: boolean; isSuccess?: boolean }) => {
  return (
    <div
      className={`alert mx-auto my-10 w-2/3 text-base shadow-lg ${
        isSuccess ? "alert-success" : "alert-error"
      } 
      
      ${isDone ? "opacity-100" : "opacity-0"} transition-opacity`}
    >
      <div>
        {isSuccess ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        <span>{isSuccess ? "Phrase Submitted!" : "Error Submitting Phrase"}</span>
      </div>
    </div>
  );
};
