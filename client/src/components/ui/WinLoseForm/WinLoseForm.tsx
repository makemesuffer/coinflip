import classNames from 'classnames';
import { Button } from 'components/common/Button';

interface IWinLoseFormProps {
  win: boolean;
}

const WinLoseForm: React.FC<IWinLoseFormProps> = ({ win }) => {
  const textColorClass = classNames('text-center text-xl font-bold mt-2', {
    'text-green-500': win,
    'text-red-500': !win,
  });

  return (
    <div>
      <div className="text-center text-xl font-bold">
        YOU {win ? 'WON!' : 'LOST!'}
      </div>
      <div className={textColorClass}>0.05 ETH</div>
      <div className="divider" />
      <Button additionalClass="w-1/2 block mx-auto">
        {win ? 'CLAIM REWARD' : 'TRY AGAIN?'}
      </Button>
    </div>
  );
};

export default WinLoseForm;
