import { ethers, BigNumber } from 'ethers';

import { AppDispatch, RootState } from 'store';
import { address } from 'data/address';
import { abi } from 'data/abi';
import {
  IContractConnection,
  SetContractAction,
  SetErrorsAction,
  SetIsLoadingAction,
  CoinflipActionEnum,
  ClearGameAction,
  GameStatus,
  IGameResult,
  IPlayerBet,
  SetGameResultAction,
  SetGameStatusAction,
  SetPlayerBetAction,
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

  getRecent: () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const store = getState();
      let contract = coinflipSelectors.selectContract(store);
      if (!contract) {
        contract = new ethers.Contract(
          address,
          abi,
          ethers.getDefaultProvider('rinkeby')
        );
      }

      const filter = contract.filters.playerFlipped();
      const results = await contract.queryFilter(filter, -1000000, 'latest');

      const sorted = results.sort((a: any, b: any) => {
        return b.blockNumber - a.blockNumber;
      });
      const mapped = sorted
        .map((i: any) => {
          return {
            blockNumber: i.blockNumber,
            playerAddress: i.args.playerAddress,
            randomNonce: i.args.randomNonce,
            headsOrTails: i.args.headsOrTails,
            didPlayerWin: i.args.amountWon > 0,
            amountWon: i.args.amountWon,
          };
        })
        .slice(0, 20);
      return mapped;
    } catch (err) {
      dispatch(CoinflipActionCreators.setError(['Unexpected Error']));
    }
  },

  getMyRecent: () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const store = getState();
      let contract = coinflipSelectors.selectContract(store);
      if (!contract) {
        contract = new ethers.Contract(
          address,
          abi,
          ethers.getDefaultProvider('rinkeby')
        );
      }

      const playerAddress = window.ethereum.selectedAddress;

      const filter = contract.filters.playerFlipped(null, playerAddress);
      const results = await contract.queryFilter(filter, -1000000, 'latest');

      const sorted = results.sort((a: any, b: any) => {
        return b.blockNumber - a.blockNumber;
      });
      const mapped = sorted
        .map((i: any) => {
          return {
            blockNumber: i.blockNumber,
            playerAddress: i.args.playerAddress,
            randomNonce: i.args.randomNonce,
            headsOrTails: i.args.headsOrTails,
            didPlayerWin: i.args.amountWon > 0,
            amountWon: i.args.amountWon,
          };
        })
        .slice(0, 20);
      return mapped;
    } catch (err) {
      dispatch(CoinflipActionCreators.setError(['Unexpected Error']));
    }
  },

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

  getTopWins:
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const store = getState();
        let contract = coinflipSelectors.selectContract(store);
        if (!contract) {
          contract = new ethers.Contract(
            address,
            abi,
            ethers.getDefaultProvider('rinkeby')
          );
        }

        const filter = contract.filters.playerFlipped();
        const results = await contract.queryFilter(filter, -1000000, 'latest');

        const sorted = results.sort((a: any, b: any) => {
          return b.args.amountWon - a.args.amountWon;
        });
        const mapped = sorted
          .map((i: any) => {
            return {
              blockNumber: i.blockNumber,
              playerAddress: i.args.playerAddress,
              randomNonce: i.args.randomNonce,
              headsOrTails: i.args.headsOrTails,
              didPlayerWin: i.args.amountWon > 0,
              amountWon: i.args.amountWon,
            };
          })
          .slice(0, 20);
        return mapped;
      } catch (err) {
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
          const startBlock = await contract.provider.getBlockNumber();
          const tx = await contract.flip(side, {
            value: betSize.toString(),
            gasLimit: 300000,
          });

          dispatch(
            CoinflipActionCreators.setPlayerBet({
              bet: +weiToEth(betSize),
              side: side,
            })
          );

          dispatch(CoinflipActionCreators.setGameStatus('flipping'));

          dispatch(CoinflipActionCreators.setError([]));

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

          const parsedQuery = parseQuery(query[length].args);
          dispatch(CoinflipActionCreators.setGameResult(parsedQuery));
          if (parsedQuery.winnings === 0) {
            dispatch(CoinflipActionCreators.setGameStatus('loss'));
          } else {
            dispatch(CoinflipActionCreators.setGameStatus('win'));
          }
        } catch (err: any) {
          dispatch(CoinflipActionCreators.setError(['Insufficient funds']));
        }
      }
    },
};
