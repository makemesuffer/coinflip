import classNames from 'classnames';
import { Identicon } from 'components/common/Identicon';
import { recentPlays } from 'data/recentPlaysDumb';
import { useTypedSelector } from 'hooks/useTypedSelector';

const RecentPlays = () => {
  const { theme } = useTypedSelector((state) => state.app);

  const cardClass = classNames('card card-bordered cursor-pointer', {
    'hover:bg-slate-700': theme === 'dark',
    'hover:bg-zinc-200': theme === 'light',
    'hover:bg-yellow-300': theme === 'cyberpunk',
  });

  return (
    <div className="text-center flex flex-col gap-1">
      {recentPlays.map((recentPlay: any) => (
        <div className={cardClass} key={recentPlay.address}>
          <div className="flex px-3 items-center gap-5">
            <Identicon address={recentPlay.address} />
            <p className="text-sm">
              Wallet {recentPlay.address.slice(2, 6)} bet {recentPlay.value} and{' '}
              {recentPlay.win ? 'doubled their money' : 'got rugged'}.
            </p>
            <p className="text-xs ml-auto self-end pb-1">{recentPlay.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPlays;
