import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Mini Pokemon Go</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.Fragment>
  );
}
