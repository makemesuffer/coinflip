import {
  IContractConnection,
  SetContractAction,
  SetErrorsAction,
  SetIsLoadingAction,
  CoinflipActionEnum,
} from './types';
// import { wheelSelectors } from './selectors';

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

//   addBet:
//     ({ betValue, betSize }: { betValue: number; betSize: BigNumber }) =>
//     async (dispatch: AppDispatch, getState: () => RootState) => {
//       const store = getState();
//       const contract = wheelSelectors.selectContract(store);
//       if (contract) {
//         try {
//           await contract.createBet(String(betValue), {
//             value: betSize.toString(),
//           });
//         } catch (err) {
//           dispatch(WheelActionCreators.setError(['Unexpected Error']));
//         }
//       }
//     },
};
