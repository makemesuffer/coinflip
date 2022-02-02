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
  let provider = new ethers.providers.AlchemyProvider(
    137, // polygon mainnet
    'rgtvQvAxxZaBbwxjBs29ki9ezhKR1t4S' // LGTUFE polygon mainnet
  );

  return useMemo(() => {
    if (!address || !abi) {
      return null;
    }

    if (!library || !chainId) {
      try {
        const ABI = new ethers.utils.Interface(abi);
        let contract;
        if (
          typeof window !== 'undefined' &&
          // @ts-ignore
          window?.ethereum?.selectedAddress
        ) {
          // @ts-ignore
          provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
          const signer = provider.getSigner();
          contract = new Contract(address, ABI, signer);
        } else {
          contract = new Contract(address, ABI, provider);
        }

        setContract({ connected: true, contract });
        return contract;
      } catch (error) {
        console.error('Failed To Get Contract', error);
        return null;
      }
    }

    try {
      const ABI = new ethers.utils.Interface(abi);
      // library.getSigner(account)
      const contract = new Contract(address, ABI, provider);
      setContract({ connected: true, contract });
      return contract;
    } catch (error) {
      console.error('Failed To Get Contract', error);
      return null;
    }
  }, [address, abi, chainId, library, account]) as T;
}
