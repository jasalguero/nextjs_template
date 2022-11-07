import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

// This may come from anywhere
let CONTENT = new Map<String, String>();
CONTENT.set("en", "Welcome!");
CONTENT.set("de", "Herzlich willkomen!");

export default function Home() {
  const {
    defaultLocale = "",
    locales = [],
    asPath,
    ...nextRouter
  } = useRouter();

  const locale = locales.includes(nextRouter.locale || "")
    ? nextRouter.locale || ""
    : defaultLocale;

  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      <h1 className={styles.title}>{CONTENT.get(locale)}</h1>
    </main>
  );
}
