import { useState } from 'react';
import { BigNumber } from 'ethers';

import { Button } from 'components/common/Button';
import { WinLoseForm } from '../WinLoseForm';

interface IFlippingFormProps {
  side: 1 | 0;
  amount: number | BigNumber;
}

const FlippingForm: React.FC<IFlippingFormProps> = ({ side, amount }) => {
  return (
    <div>
      <div className="text-center text-xl font-bold mt-10">FLIPPING</div>
      <div className="text-center text-xl font-bold mt-2">
        {side === 1 ? 'TAILS' : 'HEADS'} FOR {Number(amount)} MATIC
      </div>
    </div>
  );
};

export default FlippingForm;
