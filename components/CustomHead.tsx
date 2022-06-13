import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
};

export default function CustomHead({ title = "FIKA 2022" }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="FIKA 2022 by jiiin.cho.dev" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
