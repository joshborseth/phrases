import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <header>
      <nav className="navbar fixed top-0 left-0 right-0 border-b bg-base-300 p-5 text-xl">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 border-2 bg-base-100 p-2 font-bold shadow"
            >
              <li>
                <Link href="/contribute">Contribute</Link>
              </li>
              {session?.user?.role === "ADMIN" && (
                <>
                  <li>
                    <Link href="/manage">Manage Phrases</Link>
                  </li>
                  <li>
                    <Link href="/users">Manage Users</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link href="/" className="btn-ghost btn text-2xl normal-case lg:text-3xl">
            Phrase Generator
          </Link>
          <ul className="menu menu-horizontal hidden gap-2 px-1 lg:flex">
            <li>
              <Link href="/contribute">Contribute</Link>
            </li>
            {session?.user?.role === "ADMIN" && (
              <>
                <li>
                  <Link href="/manage">Manage Phrases</Link>
                </li>
                <li>
                  <Link href="/users">Manage Users</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end w-auto">
          {session && (
            <button
              className="btn-error btn text-secondary-content"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          )}
          {!session && status !== "loading" && (
            <button
              className="btn-success btn text-primary-content"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
          {status === "loading" && (
            <button className="loading btn-primary btn" disabled>
              Loading
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
