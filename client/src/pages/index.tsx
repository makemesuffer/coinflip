import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useRef, useState } from 'react';
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

// TODO: leaderboard no ssr! - DONE
// TODO: split components - DONE
// TODO: Win/Lose components - DONE
// TODO: Game is processed logic - DONE
// TODO: buttons active/passive - DONE
// TODO: today mockup - DONE
// TODO: mobile - DONE
// TODO: headers! - DONE
// TODO: boost perf - DONE
// TODO: leaderboard mockup
// TODO: CONTRACT CALL FOR GAME

const Home: NextPage = () => {
  const { user } = useTypedSelector((state) => state.app);
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

  // if (true) {
  //   return (
  //     <Wrapper>
  //       <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 flex-1">
  //         <div className="w-full space-y-8 max-w-2xl">
  //           <FlippingForm amount={0.05} side="HEADS" />
  //         </div>
  //       </div>
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper>
      <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="w-full space-y-8 max-w-2xl">
          <h3 className="text-center text-2xl font-extrabold">
            Over 122K SOL ($16.9M USD) FLIPPED!
          </h3>
          <div className="mx-auto h-36 w-auto text-center">
            <Image
              src="https://i.imgur.com/896fn7R.png"
              alt="coin"
              height="140"
              width="140"
            />
          </div>
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
              <h5 className="text-center text-xl font-bold pb-7">
                RECENT PLAYS:
              </h5>
              <RecentPlaysNoSSR />
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
