import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

import { useActions } from './useActions';
import { abi } from 'data/abi';
import { address } from 'data/address';

export default function useContract<T extends Contract = Contract>() {
  const { setContract } = useActions();
  const { library, chainId, account } = useWeb3React();
  //  || !library || !chainId

  return useMemo(() => {
    if (!address || !abi) {
      return null;
    }

    if (!library || !chainId) {
      try {
        const ABI = new ethers.utils.Interface(abi);
        const contract = new Contract(
          address,
          ABI,
          ethers.getDefaultProvider('rinkeby')
        );
        setContract({ connected: true, contract });
        return contract;
      } catch (error) {
        console.error('Failed To Get Contract', error);
        return null;
      }
    }

    try {
      const ABI = new ethers.utils.Interface(abi);
      const contract = new Contract(address, ABI, library.getSigner(account));
      setContract({ connected: true, contract });
      return contract;
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
  }, [address, abi, chainId, library]) as T;
}
