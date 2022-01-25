import { InjectedConnector } from '@web3-react/injected-connector';

export const getConnectors = new InjectedConnector({
  supportedChainIds: [137, 80001, 4],
});
