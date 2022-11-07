import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      <Component {...pageProps} />
    </div>
  );
}
