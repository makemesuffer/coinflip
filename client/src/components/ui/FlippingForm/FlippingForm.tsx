import { useState } from 'react';

import { Button } from 'components/common/Button';
import { WinLoseForm } from '../WinLoseForm';

interface IFlippingFormProps {
  side: string;
  amount: number;
}

const FlippingForm: React.FC<IFlippingFormProps> = ({ side, amount }) => {
  const [showWinLoseForm, setShowWinLoseForm] = useState(false);
  const [winnable, setWinnable] = useState<boolean>(false);

  const handleTest = (win: boolean) => {
    setShowWinLoseForm(true);
    setWinnable(win);
  };

  if (showWinLoseForm) {
    return <WinLoseForm win={winnable} />;
  }

  return (
    <div>
      <div className="text-center text-xl font-bold mt-10">FLIPPING</div>
      <div className="text-center text-xl font-bold mt-2">
        {side.toUpperCase()} FOR {amount} MATIC
      </div>
      <p>For test purpose for now..</p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <Button
          onClick={() => {
            handleTest(true);
          }}
        >
          Win
        </Button>
        <Button
          onClick={() => {
            handleTest(false);
          }}
        >
          Lose
        </Button>
      </div>
    </div>
  );
};

export default FlippingForm;
