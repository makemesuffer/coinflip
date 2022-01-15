
import { Button } from 'components/common/Button';

const BetForm = () => {

  return (
    <div>
      <div className="text-center text-xl font-bold">I like</div>
      <div className="flex justify-center gap-5 p-2">
        <Button additionalClass="w-4/12">HEADS</Button>
        <Button additionalClass="w-4/12">TAILS</Button>
      </div>
      <div className="text-center text-xl font-bold">For</div>
      <div className="flex flex-col divide-y gap-5">
        <div className="grid grid-cols-3 gap-5 p-2">
          <Button>0.05 ETH</Button>
          <Button>0.01 ETH</Button>
          <Button>0.1 ETH</Button>
          <Button>0.25 ETH</Button>
          <Button>0.5 ETH</Button>
          <Button>1 ETH</Button>
        </div>
        <Button additionalClass="p-2">DOUBLE OF NOTHING</Button>
      </div>
    </div>
  );
};

export default BetForm;
