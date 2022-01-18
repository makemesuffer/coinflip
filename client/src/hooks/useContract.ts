import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

import { useActions } from './useActions';
import { abi } from 'data/abi';
import { address } from 'data/address';

export default function useContract<T extends Contract = Contract>(
  // contract: Contract | null
) {
  // const abi = contract && contract.abi_string.split(contract.abi_delimiter);
  const { library, account, chainId } = useWeb3React();
  const { setContract } = useActions();

  return useMemo(() => {
    if (!address || !abi || !library || !chainId) {
      return null;
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
  }, [address, abi, library, account]) as T;
}
