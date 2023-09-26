import Head from "next/head";
import React from "react";
import styles from "../styles/Privacy.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { env } from "~/env.mjs";
import { PrivacyServer } from "~/server/privacy";

export interface PrivacyProps {
  data: string;
}

export default function Privacy(props: PrivacyProps) {
  return (
    <>
      <Head>
        <title>Privacy | BlockLancer</title>
        <meta name="description" content={env.NEXT_PUBLIC_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="">
        <div className={styles.markdownBody + ""}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {props.data}
          </ReactMarkdown>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
