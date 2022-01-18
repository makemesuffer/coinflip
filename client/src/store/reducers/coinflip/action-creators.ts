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
  //         const contract = wheelSelectors.selectContract(getState());
  //         const amountToWithdraw = await contract.getAmountToWithdraw(gameId);
  //         console.log(amountToWithdraw.toString());
  //         const win = await contract.withdrawWin(gameId);
  //         console.log(win);
  //       }
  //     },

  addBet:
    ({ betSize }: { betSize: BigNumber }) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const store = getState();
      const contract = coinflipSelectors.selectContract(store);
      if (contract) {
        try {
          const test = await contract.flip({
            value: betSize.toString(),
          });
          console.log(test);
        } catch (err) {
          console.log(err);
          dispatch(CoinflipActionCreators.setError(['Unexpected Error']));
        }
      }
    },
};
