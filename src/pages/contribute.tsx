import Link from "next/link";
import { type FormEvent, useRef } from "react";
import { trpc } from "../utils/trpc";
const Contribute = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const postPhrase = trpc.phrase.createPhrase.useMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phrase = inputRef.current?.value;
    if (phrase && phrase.length > 0) {
      postPhrase.mutate({ phrase });
    }
  };
  return (
    <form
      className="flex min-h-screen flex-col items-center justify-center gap-20 text-center text-4xl"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="phrase">Phrase:</label>
      <textarea ref={inputRef} className="h-80 resize-none p-2 text-black" />
      <div className="flex gap-5">
        <button className="rounded-xl border-2 px-4 py-2" type="submit">
          Submit
        </button>
        <Link href="/" className="rounded-xl border-2 px-4 py-2">
          Back
        </Link>
      </div>
    </form>
  );
};

export default Contribute;
