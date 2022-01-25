import classNames from 'classnames';
import { useMemo } from 'react';
import { BigNumber } from 'ethers';

import { Identicon } from 'components/common/Identicon';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { IPlays } from 'store/reducers/app/types';
import { Loader } from 'components/common/Loader';
import { weiToMatic } from 'utils/formatEther';

interface IRecentPlays {
  flag: 'top wins' | 'recent';
}

const RecentPlays: React.FC<IRecentPlays> = ({ flag }) => {
  const { theme, topPlayers, recentPlays } = useTypedSelector(
    (state) => state.app
  );

  const cardClass = classNames('card card-bordered cursor-pointer', {
    'hover:bg-slate-700': theme === 'dark',
    'hover:bg-zinc-200': theme === 'light',
    'hover:bg-yellow-300': theme === 'cyberpunk',
  });

  const content = useMemo(() => {
    if (flag === 'top wins' && topPlayers) {
      return (
        <div className="grid grid-cols-1">
          {topPlayers.slice(0, 10).map((play: IPlays) => (
            <div className={cardClass} key={play.blockNumber}>
              <div className="flex px-3 items-center gap-5">
                <Identicon address={play.playerAddress} />
                <p className="text-sm">
                  Wallet ({play.playerAddress.slice(2, 6)}) bet on{' '}
                  {play.headsOrTails === 1 ? 'TAILS' : 'HEADS'} and won{' '}
                  {weiToMatic(BigNumber.from(String(play.amountWon)))} MATIC.
                </p>
                <p className="text-xs ml-auto self-end pb-1">
                  {/* {recentPlay.blockNumber} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (flag === 'recent' && recentPlays) {
      return (
        <>
          {recentPlays.slice(0, 10).map((play: IPlays) => (
            <div className={cardClass} key={play.blockNumber}>
              <div className="flex px-3 items-center gap-5">
                <Identicon address={play.playerAddress} />
                <p className="text-sm">
                  Wallet ({play.playerAddress.slice(2, 6)}) bet on{' '}
                  {play.headsOrTails === 1 ? 'TAILS' : 'HEADS'} and{' '}
                  {play.didPlayerWin ? 'doubled their money' : 'got rugged'}.
                </p>
                <p className="text-xs ml-auto self-end pb-1">
                  {/* {recentPlay.blockNumber} */}
                </p>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <Loader theme={theme} />;
    }
  }, [flag, topPlayers, recentPlays]);

  return content;
};

export default RecentPlays;
