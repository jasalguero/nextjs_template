import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPagesData } from "../../lib/api/md";

export const getStaticProps: GetStaticProps = async ({
  locale = "",
  defaultLocale = "",
}) => {
  const allPageData = getAllPagesData(locale, locale === defaultLocale);
  return {
    props: {
      allPageData,
    },
  };
};

export default function MD_Pages({
  allPageData,
}: {
  allPageData: { title: string; id: string }[];
}) {
  return (
    <>
      <h1>This are the current pages in markdown:</h1>
      <ul>
        {allPageData.map((p) => (
          <li key={p.id}>
            <Link href={`/md/pages/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
