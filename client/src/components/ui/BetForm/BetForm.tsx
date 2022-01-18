import { useState } from 'react';
import classNames from 'classnames';

import { Button } from 'components/common/Button';

interface ISelectedValues {
  side: string;
  value: string;
}

const BetForm = () => {
  const [selectedValues, setSelectedValues] = useState<ISelectedValues>(
    {} as ISelectedValues
  );

  const addFocus = (key: string, value: string) => {
    const valuesToSet = { ...selectedValues, [key]: value };
    setSelectedValues(valuesToSet);
  };

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
              selectedValues.value === '0.01' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '0.01')}
          >
            0.01 ETH
          </Button>
          <Button
            additionalClass={
              selectedValues.value === '0.05' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '0.05')}
          >
            0.05 ETH
          </Button>
          <Button
            additionalClass={
              selectedValues.value === '0.1' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '0.1')}
          >
            0.1 ETH
          </Button>
          <Button
            additionalClass={
              selectedValues.value === '0.25' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '0.25')}
          >
            0.25 ETH
          </Button>
          <Button
            additionalClass={
              selectedValues.value === '0.5' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '0.5')}
          >
            0.5 ETH
          </Button>
          <Button
            additionalClass={
              selectedValues.value === '1' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => addFocus('value', '1')}
          >
            1 ETH
          </Button>
        </div>
        <Button additionalClass="p-2">DOUBLE OF NOTHING</Button>
      </div>
    </div>
  );
};

export default BetForm;
