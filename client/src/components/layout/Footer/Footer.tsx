import { Modal } from 'components/common/Modal';

const Footer = () => {
  return (
    <footer className="body-font pb-5 md:pb-0">
      <div className="container py-8 mx-auto flex items-center flex-row justify-center divide-x text-xs">
        {/* <label htmlFor="faq-modal" className="px-2 underline cursor-pointer">
          FAQ
        </label> */}
        {/* <input type="checkbox" id="faq-modal" className="modal-toggle" />
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
        </Modal> */}
        <label htmlFor="htp-modal" className="px-2 underline cursor-pointer">
          HOW TO PLAY
        </label>
        <input type="checkbox" id="htp-modal" className="modal-toggle" />
        <Modal forWhat="htp-modal">
          <div className="flex flex-col gap-5 py-4 px-2 sm:px-2 lg:px-2 flex-1">
            <h3 className="text-2xl font-extrabold">
              How To Play
            </h3>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                1. Connect your metamask wallet and make sure you're on Polygon Mainnet
              </p>
            </div>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                2. Select either heads or tails
              </p>
            </div>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                3. Select desired MATIC bet amount
              </p>
            </div>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                4. Click &quot;Double or Nothing&quot; to wager your bet
              </p>
            </div>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                5. Approve your transaction in MetaMask
              </p>
            </div>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                6. Wait for bet result
              </p>
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
              Flip Responsibly
            </h3>
            <div className="mt-2 flex flex-col divide-y">
              <p className="text-lg py-2">
                Lucky Gnomes Coin Flip is a fun game on Polygon's network and we want all of our players to play responsibly. Please only play with MATIC you are comfortable parting with that won’t impact your well-being.
              </p>
            </div>
            <div className="flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                Resources
              </h5>
              <div className="py-2">
                <p className="text-lg">
                  Call 1-800-522-4700
                </p>
                <a href="ncpgambling.org/chat" target="_blank" className="text-lg">
                  Chat ncpgambling.org/chat
                </a>
                <p className="text-lg">
                  Text 1-800-522-4700
                </p>
              </div>
            </div>

            <div className="flex flex-col divide-y">
              <h5 className="text-xl font-bold py-2">
                Do I have a flipping problem?
              </h5>
              <div className="py-2">
                <p className="text-lg">
                  Flipping problem includes all behavior patterns that compromise, disrupt, or damage any personal, family, or vocational pursuits. Symptoms include increasing preoccupation with flipping, a need to flip more and more frequently, restlessness or irritability when attempting to stop, “chasing” losses, and loss of control manifested by continuation of the flipping behavior in spite of mounting, serious, and/or negative consequence.
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
