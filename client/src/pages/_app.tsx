import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Web3ReactProvider } from '@web3-react/core';

import { store } from 'store';
import { getLibrary } from 'utils/getLibrary';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
}

export default MyApp;
