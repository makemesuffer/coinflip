import { BigNumber } from 'ethers';
import { AppDispatch, RootState } from 'store';

import {
  IContractConnection,
  SetContractAction,
  SetErrorsAction,
  SetIsLoadingAction,
  CoinflipActionEnum,
  GameStatus,
  SetGameStatusAction,
  IPlayerBet,
  SetPlayerBetAction,
  IGameResult,
  SetGameResultAction,
  ClearGameAction,
} from './types';
import { coinflipSelectors } from './selectors';
import { weiToEth } from 'utils/formatEther';
import { parseQuery } from 'utils/parseQuery';

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

  setGameStatus: (payload: GameStatus): SetGameStatusAction => ({
    type: CoinflipActionEnum.SET_GAME_STATUS,
    payload,
  }),

  setPlayerBet: (payload: IPlayerBet): SetPlayerBetAction => ({
    type: CoinflipActionEnum.SET_PLAYER_BET,
    payload,
  }),

  clearGame: (): ClearGameAction => ({
    type: CoinflipActionEnum.CLEAR_GAME,
  }),

  setGameResult: (payload: IGameResult): SetGameResultAction => ({
    type: CoinflipActionEnum.SET_GAME_RESULT,
    payload,
  }),

  filterQuery: () => async (dispatch: AppDispatch) => {
    try {
      console.log('query');
    } catch (err) {
      console.log(err);
      dispatch(CoinflipActionCreators.setError(['Unexpected Error']));
    }
  },

  addBet:
    ({ betSize, side }: { betSize: BigNumber; side: 1 | 0 }) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const store = getState();
      const contract = coinflipSelectors.selectContract(store);
      if (contract) {
        try {
          const startBlock = await contract.provider.getBlockNumber(); // set current block number as starting block for query
          const tx = await contract.flip(side, {
            value: betSize.toString(),
          });

          dispatch(
            CoinflipActionCreators.setPlayerBet({
              bet: +weiToEth(betSize),
              side: side,
            })
          );

          dispatch(CoinflipActionCreators.setGameStatus('flipping'));

          await tx.wait();

          const playerAddress = await contract.signer.getAddress();
          const filter = await contract.filters.playerFlipped(
            null,
            playerAddress
          );
          const query = await contract.queryFilter(
            filter,
            startBlock,
            'latest'
          );

          console.log(query.length);
          console.log(query);
          const parsedQuery = parseQuery(query[length].args);
          console.log(parsedQuery);
          dispatch(CoinflipActionCreators.setGameResult(parsedQuery));
          if (parsedQuery.winnings === 0) {
            dispatch(CoinflipActionCreators.setGameStatus('loss'));
          } else {
            dispatch(CoinflipActionCreators.setGameStatus('win'));
          }
          // parse results
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

  getWinnings:
    (amount: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const store = getState();
      const contract = coinflipSelectors.selectContract(store);
      if (contract) {
        // const amountForFunc = BigNumber.from(amount);
        console.log(weiToEth(BigNumber.from(String(amount))));
        const amountToWithdraw = await contract.withdrawFunds(
          BigNumber.from(String(amount))
        );
        dispatch(CoinflipActionCreators.clearGame());
        console.log(amountToWithdraw.toString());
      }
    },
};
