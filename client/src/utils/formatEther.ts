import { formatEther, parseEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

// In a future it will be better to use api to fetch all the recent exchange rates. Need to think about it
// export const ONE_ETHER_IN_MATIC = 1500; // polygon mainnet
export const ONE_ETHER_IN_MATIC = 1; // polygon testnet
// 1623.76;

export const weiToEth = (wei: BigNumber) => formatEther(wei);

export const ethToWei = (eth: number): BigNumber => parseEther(`${eth}`);

export const ethToMatic = (eth: number) =>
  (ONE_ETHER_IN_MATIC * eth).toFixed(0);

export const weiToMatic = (wei: BigNumber) => {
  const eth = formatEther(wei);
  return ethToMatic(+eth);
};
