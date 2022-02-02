import { useEffect, useMemo, useState } from 'react';

import { Button } from 'components/common/Button';
import { useActions } from 'hooks/useActions';
import { ethToMatic, ethToWei, ONE_ETHER_IN_MATIC } from 'utils/formatEther';
import { AlertTypes } from 'store/reducers/alert/types';
import { useTypedSelector } from 'hooks/useTypedSelector';

interface ISelectedValues {
  side: string;
  value: string;
}

const networks = {
  '1': {
    name: 'Ethereum Mainnet',
    params: [],
  },
  '3': {
    name: 'Ropsten Testnet',
    params: [],
  },
  '4': {
    name: 'Rinkeby Testnet',
    params: [],
  },
  '42': {
    name: 'Kovan Testnet',
    params: [],
  },
  '5': {
    name: 'Goerli Testnet',
    params: [],
  },
  '137': {
    name: 'Polygon Mainnet',
    params: {
      chainId: '0x89', // 137
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC', // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://polygonscan.com'],
    },
  },
  '80001': {
    name: 'Polygon Mumbai Testnet',
    params: {
      chainId: '0x13881', // 80001
      chainName: 'Polygon Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC', // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
  },
};

// const requiredNetwork = '137'; // polygon mumbai testnet
const requiredNetwork = '80001'; // polygon mumbai testnet

const BetForm = () => {
  const [selectedValues, setSelectedValues] = useState<ISelectedValues>(
    {} as ISelectedValues
  );
  const { addBet, setAlert } = useActions();

  const [currentNetwork, setCurrentNetwork] = useState('');
  const { errors, contractConnection } = useTypedSelector(
    (state) => state.coinflip
  );

  // @ts-ignore
  let ethereum: any;
  useEffect(() => {
    // @ts-ignore
    ethereum = window.ethereum;

    if (contractConnection.connected) {
      if (ethereum) {
        setCurrentNetwork(ethereum.networkVersion);

        ethereum.on('chainChanged', (chainId: string) => {
          const networkId = parseInt(chainId, 16).toString();
          setCurrentNetwork(networkId);
        });
      }
    }
  }, []);

  const switchToRequiredNetwork = async () => {
    // @ts-ignore
    if (!ethereum) ethereum = window.ethereum;
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networks[requiredNetwork].params],
    });
  };

  const addFocus = (key: string, value: string) => {
    const valuesToSet = { ...selectedValues, [key]: value };
    setSelectedValues(valuesToSet);
  };

  const gameStarter = () => {
    if (selectedValues.side && selectedValues.value) {
      try {
        addBet({
          betSize: ethToWei(+selectedValues.value * ONE_ETHER_IN_MATIC),
          side: selectedValues.side === 'tails' ? 1 : 0,
        });
      } catch (err: any) {
        setAlert({ type: AlertTypes.error, message: err.message });
      }
    } else {
      setAlert({ type: AlertTypes.error, message: 'Select all fields' });
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error: any) => {
        setAlert({ type: AlertTypes.error, message: error });
      });
    }
  }, [errors]);

  const content = useMemo(() => {
    if (requiredNetwork !== currentNetwork) {
      return (
        <div>
          <div className="text-center text-error text-xl font-bold pb-10">
            Your wallet is not on the correct network. The current network is{' '}
            {/* @ts-ignore */}
            {networks[currentNetwork]?.name ||
              `Custom Network ${currentNetwork}`}
            . Please switch to {networks[requiredNetwork]?.name}.
          </div>
          <div className="w-full">
            <Button additionalClass="w-full" onClick={switchToRequiredNetwork}>
              Click here to switch to {networks[requiredNetwork]?.name}
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-center text-xl font-bold">I like</div>
          <div className="flex justify-center gap-5 p-2">
            <Button
              additionalClass={`w-4/12 ${
                selectedValues.side === 'heads' ? 'btn-active' : 'btn-outline'
              }`}
              onClick={() => addFocus('side', 'heads')}
            >
              HEADS
            </Button>
            <Button
              additionalClass={`w-4/12 ${
                selectedValues.side === 'tails' ? 'btn-active' : 'btn-outline'
              }`}
              onClick={() => addFocus('side', 'tails')}
            >
              TAILS
            </Button>
          </div>
          <div className="text-center text-xl font-bold">For</div>
          <div className="flex flex-col divide-y gap-5">
            <div className="grid grid-cols-3 gap-5 p-2">
              <Button
                additionalClass={
                  selectedValues.value === '15' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '15')}
              >
                {ethToMatic(15)} MATIC
              </Button>
              <Button
                additionalClass={
                  selectedValues.value === '25' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '25')}
              >
                {ethToMatic(25)} MATIC
              </Button>
              <Button
                additionalClass={
                  selectedValues.value === '50' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '50')}
              >
                {ethToMatic(50)} MATIC
              </Button>
              <Button
                additionalClass={
                  selectedValues.value === '75' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '75')}
              >
                {ethToMatic(75)} MATIC
              </Button>
              <Button
                additionalClass={
                  selectedValues.value === '100' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '100')}
              >
                {ethToMatic(100)} MATIC
              </Button>
              <Button
                additionalClass={
                  selectedValues.value === '125' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => addFocus('value', '125')}
              >
                {ethToMatic(125)} MATIC
              </Button>
            </div>
            <Button additionalClass="p-2" onClick={gameStarter}>
              DOUBLE OR NOTHING
            </Button>
          </div>
        </div>
      );
    }
  }, [requiredNetwork, currentNetwork, selectedValues]);

  return content;
};

export default BetForm;
