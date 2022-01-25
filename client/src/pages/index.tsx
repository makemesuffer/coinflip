import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useMemo, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import Image from 'next/image';

import { Wrapper } from 'components/layout/Wrapper';
import { Button } from 'components/common/Button';
import { getConnectors } from 'utils/getConnectors';
import { parseBalance } from 'utils/parseBalance';
import { useActions } from 'hooks/useActions';
import { useETHBalance } from 'hooks/useETHBalance';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { BetForm } from 'components/ui/BetForm';
import { RecentPlaysNoSSR } from 'components/ui/RecentPlays';
import { WinLoseForm } from 'components/ui/WinLoseForm';
import { FlippingForm } from 'components/ui/FlippingForm';
import useContract from 'hooks/useContract';
import { AlertTypes } from 'store/reducers/alert/types';
import { parseGames } from 'utils/parseGames';
import { Loader } from 'components/common/Loader';

const Home: NextPage = () => {
  const { theme } = useTypedSelector((state) => state.app);
  const { gameStatus, playerBet, gameResult } = useTypedSelector(
    (state) => state.coinflip
  );
  const { account, error, activate, setError, active } = useWeb3React();
  const [connecting, setConnecting] = useState(false);
  const { data: etherBalance } = useETHBalance(account);
  const {
    setUser,
    setGameStatus,
    setAlert,
    getTopWins,
    getRecent,
    setRecentPlays,
    setTopWins,
  } = useActions();
  const onboarding = useRef<MetaMaskOnboarding>();
  const imageRef = useRef<HTMLDivElement>();
  const contract = useContract();

  useEffect(() => {
    if (gameStatus === 'flipping' && Object.keys(gameResult).length === 0) {
      // @ts-ignore
      imageRef.current?.style.animation = 'spin 100s forwards';
    } else if (
      gameStatus === 'flipping' &&
      Object.keys(gameResult).length === 1 &&
      gameResult.headOrTails === 'HEADS'
    ) {
      // @ts-ignore
      imageRef.current?.style.animation = 'spin-heads 3s forwards';
    } else if (
      gameStatus === 'flipping' &&
      Object.keys(gameResult).length === 1 &&
      gameResult.headOrTails === 'TAILS'
    ) {
      // @ts-ignore
      imageRef.current?.style.animation = 'spin-tails 3s forwards';
    } else {
      // @ts-ignore
      imageRef.current?.style.animation = 'none';
    }
  }, [gameStatus, gameResult]);

  useEffect(() => {
    // @ts-ignore
    getTopWins().then((topWins: any) => {
      const tw = parseGames(topWins);
      setTopWins(tw);
    });

    // @ts-ignore
    getRecent().then((recentGames: any) => {
      const rg = parseGames(recentGames);
      setRecentPlays(rg);
    });
  }, [contract]);

  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  useEffect(() => {
    if (active || error) {
      if (error) {
        setAlert({ type: AlertTypes.error, message: error.message });
      }
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  useEffect(() => {
    if (
      account !== null &&
      account !== undefined &&
      etherBalance !== undefined
    ) {
      setUser({
        cashAmount: parseBalance(etherBalance),
        account,
      });
    }
  }, [account, etherBalance]);

  async function handleConnectWallet() {
    setConnecting(true);

    try {
      await activate(getConnectors, undefined, true);
      setGameStatus('betting');
    } catch (error: any) {
      
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    }
  }

  const viewToRender = useMemo(() => {
    if (gameStatus === 'not started') {
      return (
        <div>
          <div className="flex justify-center pb-7">
            <Button
              isLoading={connecting}
              onClick={() => {
                handleConnectWallet();
              }}
            >
              Connect Metamask
            </Button>
          </div>
          <h5 className="text-center text-xl font-bold pb-7">RECENT PLAYS:</h5>
          {contract ? (
            <RecentPlaysNoSSR flag={'recent'} />
          ) : (
            <Loader theme={theme} />
          )}
        </div>
      );
    } else if (gameStatus === 'betting') {
      return <BetForm />;
    } else if (gameStatus === 'flipping') {
      return <FlippingForm side={playerBet.side} amount={playerBet.bet} />;
    } else if (gameStatus === 'win') {
      return <WinLoseForm win />;
    } else if (gameStatus === 'loss') {
      return <WinLoseForm win={false} />;
    }
  }, [gameStatus]);

  return (
    <Wrapper>
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="w-full space-y-8 max-w-2xl">
          <h3 className="text-center text-2xl font-extrabold">
            Over 122K SOL ($16.9M USD) FLIPPED!
          </h3>
          <div className="coin" id="coin" ref={imageRef as any}>
            <div className="heads">
              <Image
                src="/assets/svg/heads.svg"
                alt="coin"
                height="140"
                width="140"
              />
            </div>
            <div className="tails">
              <Image
                src="/assets/svg/tails.svg"
                alt="coin"
                height="150"
                width="150"
              />
            </div>
          </div>
          {viewToRender}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
