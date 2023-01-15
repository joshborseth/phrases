import { Phrase } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import AllUsersList from "src/components/AllUsersList";
import Loading from "../components/Loading";
import { trpc } from "../utils/trpc";
const Users: NextPage = () => {
  return (
    <>
      <Head>
        <title>Random Phrases | Manage Users</title>
      </Head>
      <main className="flex min-h-screen flex-col justify-center text-center text-lg">
        <h1 className="pt-32 pb-10 text-4xl">Manage Users</h1>
        <AllUsersList />
      </main>
    </>
  );
};

export default Users;
