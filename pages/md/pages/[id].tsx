import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getAllPageIds, getPageAsHtml } from "../../../lib/api/md";

export const getStaticPaths: GetStaticPaths = async ({
  locales = [],
  defaultLocale = "",
}) => {
  const paths = getAllPageIds(locales, defaultLocale);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale,
}) => {
  const pageData = await getPageAsHtml(
    params?.id as string,
    locale || "",
    defaultLocale || ""
  );
  return {
    props: {
      pageData,
    },
  };
};

export default function Page({
  pageData,
}: {
  pageData: { title: string; contentHtml: string };
}) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <article>
        <h2>{pageData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
      </article>
    </>
  );
}
