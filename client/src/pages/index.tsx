import type { NextPage } from 'next';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

import { Wrapper } from 'components/layout/Wrapper';
import { Button } from 'components/common/Button';
import { recentPlays } from 'data/recentPlaysDumb';
import { Identicon } from 'components/common/Identicon';
import { getConnectors } from 'utils/getConnectors';
import { parseBalance } from 'utils/parseBalance';
import { useActions } from 'hooks/useActions';
import { useETHBalance } from 'hooks/useETHBalance';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { BetForm } from 'components/ui/BetForm';
import NoSsr from 'components/common/NoSSR/NoSSR';

// TODO: leaderboard no ssr!

const Home: NextPage = () => {
  const { theme, user } = useTypedSelector((state) => state.app);
  const { account, error, activate, setError, active } = useWeb3React();
  const [connecting, setConnecting] = useState(false);
  const { data: etherBalance } = useETHBalance(account);
  const { setUser } = useActions();
  const onboarding = useRef<MetaMaskOnboarding>();

  useEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  function handleConnectWallet() {
    setConnecting(true);

    activate(getConnectors, undefined, true).catch((error) => {
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  }

  useEffect(() => {
    if (active || error) {
      if (error) {
        // showErrorMessage(error.message);
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

  const cardClass = classNames('card card-bordered cursor-pointer', {
    'hover:bg-slate-700': theme === 'dark',
    'hover:bg-zinc-200': theme === 'light',
    'hover:bg-yellow-300': theme === 'cyberpunk',
  });

  return (
    <Wrapper>
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="w-full space-y-8 max-w-2xl">
          <h3 className="text-center text-2xl font-extrabold">
            Over 122K SOL ($16.9M USD) FLIPPED!
          </h3>
          <img
            src="https://i.imgur.com/896fn7R.png"
            alt="coin"
            className="mx-auto h-36 w-auto"
          />
          {!user.account ? (
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
              <h5 className="text-center text-xl font-bold">RECENT PLAYS</h5>
              <div className="text-center flex flex-col gap-1">
                <NoSsr>
                  {recentPlays.map((recentPlay: any) => (
                    <div className={cardClass} key={recentPlay.address}>
                      <div className="flex px-3 items-center gap-5">
                        <Identicon address={recentPlay.address} />
                        <p className="text-sm">
                          Wallet {recentPlay.address.slice(2, 6)} bet{' '}
                          {recentPlay.value} and{' '}
                          {recentPlay.win
                            ? 'doubled their money'
                            : 'got rugged'}
                          .
                        </p>
                        <p className="text-xs ml-auto self-end pb-1">
                          {recentPlay.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </NoSsr>
              </div>
            </div>
          ) : (
            <BetForm />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
