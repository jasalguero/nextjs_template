import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import cn from "classnames";

export default function Navbar() {
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
    <div className={styles.navbar}>
      {locales.map((l, i) => {
        return (
          <span
            key={i}
            className={cn(
              l === locale ? styles.selected : "",
              styles.lang_selector
            )}
          >
            <Link href={asPath} locale={l}>
              {l}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
