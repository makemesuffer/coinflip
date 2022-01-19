import { BigNumber } from 'ethers';
import { AppDispatch, RootState } from 'store';

import {
  IContractConnection,
  SetContractAction,
  SetErrorsAction,
  SetIsLoadingAction,
  CoinflipActionEnum,
} from './types';
import { coinflipSelectors } from './selectors';

export const CoinflipActionCreators = {
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: CoinflipActionEnum.SET_IS_LOADING,
    payload,
  }),

  setError: (payload: string[]): SetErrorsAction => ({
    type: CoinflipActionEnum.SET_ERRORS,
    payload,
  }),

  setContract: (payload: IContractConnection): SetContractAction => ({
    type: CoinflipActionEnum.SET_CONTRACT,
    payload,
  }),

  //   getPrize:
  //     ({ gameId }: { gameId: number | undefined }) =>
  //     async (dispatch: AppDispatch, getState: () => RootState) => {
  //       if (gameId) {
  //         const contract = coinflipSelector.selectContract(getState());
  //         const amountToWithdraw = await contract.getAmountToWithdraw(gameId);
  //         console.log(amountToWithdraw.toString());
  //         const win = await contract.withdrawWin(gameId);
  //         console.log(win);
  //       }
  //     },

  addBet:
    ({ betSize, side }: { betSize: BigNumber; side: number }) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const store = getState();
      const contract = coinflipSelectors.selectContract(store);
      if (contract) {
        try {
          const startBlock = await contract.provider.getBlockNumber(); // set current block number as starting block for query
          const tx = await contract.flip(side, {
            value: betSize.toString(),
          });
          console.log(contract);

          await tx.wait();

          const playerAddress = await contract.signer.getAddress();
          const filter = await contract.filters.playerFlipped(null, playerAddress);
          const query = await contract.queryFilter(filter, startBlock, 'latest');
          console.log(query); // parse results
          // query will return an array of event logs
          // in 90 percent of all cases it should only return one event log
          // but in case it returns multiple logs, use the one with the largest block number
          // relevant data is inside the args object (for example if args.amountWon = 0, then player has lost)
          // transaction matching can be refined further by using logEvent.getTransaction()
          // which contains transaction hash and transaction value (amount bet)
        } catch (err) {
          console.log(err);
          dispatch(CoinflipActionCreators.setError(['Unexpected Error']));
        }
      }
    },
};
