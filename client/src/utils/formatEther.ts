import { formatEther, parseEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

export const weiToEth = (wei: BigNumber | number) => formatEther(wei);

export const ethToWei = (eth: number): BigNumber => parseEther(`${eth}`);

// export const ethToMatic = ()
