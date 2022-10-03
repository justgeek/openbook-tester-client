import "../sass/styles.scss";
import type { AppProps } from "next/app";
import { App } from "layouts/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
