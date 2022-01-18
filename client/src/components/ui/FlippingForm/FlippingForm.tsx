interface IFlippingFormProps {
  side: string;
  amount: number;
}

const FlippingForm: React.FC<IFlippingFormProps> = ({ side, amount }) => {
  return (
    <div>
      <img
        src="https://i.imgur.com/896fn7R.png"
        alt="coin"
        className="mx-auto h-36 w-auto"
      />
      <div className="text-center text-xl font-bold mt-10">FLIPPING</div>
      <div className="text-center text-xl font-bold mt-2">
        {side} FOR {amount} ETH
      </div>
    </div>
  );
};

export default FlippingForm;
