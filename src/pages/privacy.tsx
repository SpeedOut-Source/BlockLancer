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
        <meta name="description" content={env.NEXT_PUBLIC_DESC} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <article
        className={
          styles.markdownBody +
          "prose-stone prose-headings:my-1 prose-a:my-1 prose-a:text-blue-600 prose-a:no-underline prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0 prose-li:my-0 prose-img:my-2 prose-img:inline-block prose-img:rounded-xl container prose relative mx-auto mt-5 max-w-4xl"
        }
      >
        <div className="rounded-2xl bg-base-100/80 px-6 py-4 ring-1 ring-base-content/5">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {props.data}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}

export async function getStaticProps() {
  return PrivacyServer();
}
