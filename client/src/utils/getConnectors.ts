import { InjectedConnector } from '@web3-react/injected-connector';

export const getConnectors = new InjectedConnector({
  supportedChainIds: [1337, 31337, 1, 80001, 4],
});
