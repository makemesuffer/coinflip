import { Modal } from 'components/common/Modal';

const Footer = () => {
  return (
    <footer className="body-font pb-5 md:pb-0">
      <div className="container py-8 mx-auto flex items-center flex-row justify-center divide-x text-xs">
        <label htmlFor="faq-modal" className="px-2 underline cursor-pointer">
          FAQ
        </label>
        <input type="checkbox" id="faq-modal" className="modal-toggle" />
        <Modal forWhat="faq-modal">
          <div className="flex flex-col gap-5 py-4 px-2 sm:px-2 lg:px-2 flex-1">
            <h3 className="text-2xl font-extrabold">
              Frequently Asked Questions
            </h3>
            <div className="mt-2 flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                What is Degen Coin Flip (DCF)?
              </h5>
              <p className="text-md py-2">
                Degen Coin Flip is a smart contract that allows users to play
                Double or Nothing with their Solana tokens. Odds are 50/50 with
                a 3.5% fee that goes to DCF NFT holders.
              </p>
            </div>
            <div className="flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                How do I know I can Trust DCF?
              </h5>
              <div className="py-2">
                <p className="text-md">
                  DCF has over 100K SOL (~16 Million USD) flipped since we
                  started and we are the trusted platform on Solana.
                </p>
                <p className="text-md mt-2">
                  The DCF Team and DCF NFT holders' have aligned incentives for
                  the game to have exactly 50/50 odds.
                </p>
                <p className="text-md mt-2">
                  Our House and Fee wallets are all public and every transaction
                  can be reviewed by anyone.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              className="btn btn-primary btn-sm lg:btn-md w-full"
              htmlFor="faq-modal"
            >
              Got It
            </label>
          </div>
        </Modal>
        <label htmlFor="htp-modal" className="px-2 underline cursor-pointer">
          HOW TO PLAY
        </label>
        <input type="checkbox" id="htp-modal" className="modal-toggle" />
        <Modal forWhat="htp-modal">
          <div className="flex flex-col gap-5 py-4 px-2 sm:px-2 lg:px-2 flex-1">
            <h3 className="text-2xl font-extrabold">
              Frequently Asked Questions
            </h3>
            <div className="mt-2 flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                What is Degen Coin Flip (DCF)?
              </h5>
              <p className="text-md py-2">
                Degen Coin Flip is a smart contract that allows users to play
                Double or Nothing with their Solana tokens. Odds are 50/50 with
                a 3.5% fee that goes to DCF NFT holders.
              </p>
            </div>
            <div className="flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                How do I know I can Trust DCF?
              </h5>
              <div className="py-2">
                <p className="text-md">
                  DCF has over 100K SOL (~16 Million USD) flipped since we
                  started and we are the trusted platform on Solana.
                </p>
                <p className="text-md mt-2">
                  The DCF Team and DCF NFT holders' have aligned incentives for
                  the game to have exactly 50/50 odds.
                </p>
                <p className="text-md mt-2">
                  Our House and Fee wallets are all public and every transaction
                  can be reviewed by anyone.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              className="btn btn-primary btn-sm lg:btn-md w-full"
              htmlFor="htp-modal"
            >
              Got It
            </label>
          </div>
        </Modal>
        <label htmlFor="fr-modal" className="px-2 underline cursor-pointer">
          FLIP RESPONSIBLY
        </label>
        <input type="checkbox" id="fr-modal" className="modal-toggle" />
        <Modal forWhat="fr-modal">
          <div className="flex flex-col gap-5 py-4 px-2 sm:px-2 lg:px-2 flex-1">
            <h3 className="text-2xl font-extrabold">
              Frequently Asked Questions
            </h3>
            <div className="mt-2 flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                What is Degen Coin Flip (DCF)?
              </h5>
              <p className="text-md py-2">
                Degen Coin Flip is a smart contract that allows users to play
                Double or Nothing with their Solana tokens. Odds are 50/50 with
                a 3.5% fee that goes to DCF NFT holders.
              </p>
            </div>
            <div className="flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                How do I know I can Trust DCF?
              </h5>
              <div className="py-2">
                <p className="text-md">
                  DCF has over 100K SOL (~16 Million USD) flipped since we
                  started and we are the trusted platform on Solana.
                </p>
                <p className="text-md mt-2">
                  The DCF Team and DCF NFT holders' have aligned incentives for
                  the game to have exactly 50/50 odds.
                </p>
                <p className="text-md mt-2">
                  Our House and Fee wallets are all public and every transaction
                  can be reviewed by anyone.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              className="btn btn-primary btn-sm lg:btn-md w-full"
              htmlFor="fr-modal"
            >
              Got It
            </label>
          </div>
        </Modal>
      </div>
    </footer>
  );
};

export default Footer;
