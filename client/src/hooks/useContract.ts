import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';

import { useActions } from './useActions';
import { abi } from 'data/abi';
import { address } from 'data/address';

export default function useContract<T extends Contract = Contract>() {
  const { setContract } = useActions();
  //  || !library || !chainId

  return useMemo(() => {
    if (!address || !abi) {
      return null;
    }

    try {
      const ABI = new ethers.utils.Interface(abi);
      // ethers.getDefaultProvider('rinkeby')
      // library.getSigner(account)
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
  }, [address, abi]) as T;
}
