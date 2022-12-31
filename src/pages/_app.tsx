import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Nav from "../components/Nav";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
