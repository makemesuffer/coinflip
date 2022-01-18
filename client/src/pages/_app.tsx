import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { Web3ReactProvider } from '@web3-react/core';

import { store } from 'store';
import { getLibrary } from 'utils/getLibrary';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider>
          <Head>
            <title>Toss Up</title>
            <meta property="og:title" content="Toss Up" />
            <meta property="og:description" content="Toss Up ur luck" />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content="https://starlate.https://coinflip-deploy.vercel.app/"
            />
            <meta property="og:image" content="alt" />
            <meta property="description" content="Something!" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
