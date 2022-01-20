import classNames from 'classnames';
import { BigNumber } from 'ethers';

import { Button } from 'components/common/Button';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { weiToEth } from 'utils/formatEther';

interface IWinLoseFormProps {
  win: boolean;
}

const WinLoseForm: React.FC<IWinLoseFormProps> = ({ win }) => {
  const { clearGame, getWinnings } = useActions();
  const { gameResult } = useTypedSelector((state) => state.coinflip);

  const textColorClass = classNames('text-center text-xl font-bold mt-2', {
    'text-green-500': win,
    'text-red-500': !win,
  });

  return (
    <div>
      <div className="text-center text-xl font-bold">
        YOU {win ? 'WON!' : 'LOST!'}
      </div>
      <div className={textColorClass}>
        {weiToEth(BigNumber.from(String(gameResult.winnings)))} MATIC
      </div>
      <div className="divider" />
      <Button
        additionalClass="w-1/2 block mx-auto"
        onClick={() => {
          if (!win) {
            clearGame();
          } else {
            // TODO: need help
            getWinnings(gameResult.winnings);
          }
        }}
      >
        {win ? 'CLAIM REWARD' : 'TRY AGAIN?'}
      </Button>
    </div>
  );
};

export default WinLoseForm;
