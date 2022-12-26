import Link from "next/link";

const Nav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-neutral p-10">
      <nav className="w-full">
        <ul className="flex w-full flex-wrap justify-center gap-2">
          <li>
            <Link className="btn-primary btn" href="/">
              Phrase Generator
            </Link>
          </li>
          <li>
            <Link className="btn-secondary btn" href="/contribute">
              Contribute a Phrase
            </Link>
          </li>
          <li>
            <Link href="/manage" className="btn-accent btn">
              Manage Phrases
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Nav;
