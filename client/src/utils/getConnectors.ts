import { InjectedConnector } from '@web3-react/injected-connector';

export const getConnectors = new InjectedConnector({
  supportedChainIds: [137, 80001, 1, 3, 4, 42, 5],
});
