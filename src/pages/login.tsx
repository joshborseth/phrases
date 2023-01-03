import { type NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

const Login: NextPage = ({ providers }: any) => {
  return (
    <>
      <Head>
        <title>Random Phrases | Login</title>
      </Head>
      <main className="flex min-h-screen flex-col justify-center gap-10 text-center text-lg">
        {Object.values(providers).map((provider: any) => (
          <div key={provider.id} className="mx-auto w-1/2 bg-neutral text-center">
            <button
              className="btn-accent btn h-full w-full text-xl"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
        <p className="text-xl">
          Signing in allows you to delete phrases if you have the admin role.
        </p>
      </main>
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
