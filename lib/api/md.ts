import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const postsDirectory = join(process.cwd(), "_md-pages");

export function getAllPageFolders() {
  return fs.readdirSync(postsDirectory);
}

export function getPageData(
  folderName: string,
  locale: string,
  isDefaultLocale: boolean
) {
  const fileName = isDefaultLocale ? "index.md" : `index.${locale}.md`;
  const fullPath = join(postsDirectory, folderName, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    ...data,
    id: folderName.replace(/\.md$/, ""),
    date: data.id,
  };
}

export function getAllPagesData(locale: string, isDefaultLocale: boolean) {
  const pageIds = getAllPageFolders();
  const posts = pageIds
    .map((folderName) => getPageData(folderName, locale, isDefaultLocale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllPageIds(locales: string[], defaultLocale: string) {
  let paths: { params: { id: string }; locale: string }[] = [];

  const postIds = fs.readdirSync(postsDirectory);

  for (let id of postIds) {
    for (let locale of locales) {
      let fullpath = path.join(
        postsDirectory,
        id,
        locale === defaultLocale ? "index.md" : `index.${locale}.md`
      );
      if (!fs.existsSync(fullpath)) {
        continue;
      }

      paths.push({ params: { id }, locale });
    }
  }

  return paths;
}

export async function getPageAsHtml(
  id: string,
  locale: string,
  defaultLocale: string
) {
  const fullPath = path.join(
    postsDirectory,
    id,
    locale === defaultLocale ? "index.md" : `index.${locale}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
