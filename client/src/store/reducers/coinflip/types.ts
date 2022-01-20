import { Contract } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';

export interface IContractConnection {
  contract: Contract | null;
  connected: boolean;
}

export type GameStatus =
  | 'not started'
  | 'betting'
  | 'flipping'
  | 'win'
  | 'loss';

export interface IPlayerBet {
  bet: BigNumber | number;
  side: 0 | 1;
}

export interface IGameResult {
  player: string;
  winnings: number;
  headOrTails: 'HEADS' | 'TAILS';
}

export interface CoinflipState {
  contractConnection: IContractConnection;
  errors: string[];
  isLoading: boolean;
  gameStatus: GameStatus;
  playerBet: IPlayerBet;
  gameResult: IGameResult;
}

export enum CoinflipActionEnum {
  SET_ERRORS = 'SET_ERRORS',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_CONTRACT = 'SET_CONTRACT',
  SET_GAME_STATUS = 'SET_GAME_STATUS',
  SET_PLAYER_BET = 'SET_PLAYER_BET',
  SET_GAME_RESULT = 'SET_GAME_RESULT',
  CLEAR_GAME = 'CLEAR_GAME',
}

export interface SetErrorsAction {
  type: CoinflipActionEnum.SET_ERRORS;
  payload: string[];
}

export interface SetIsLoadingAction {
  type: CoinflipActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export interface SetContractAction {
  type: CoinflipActionEnum.SET_CONTRACT;
  payload: IContractConnection;
}

export interface SetGameStatusAction {
  type: CoinflipActionEnum.SET_GAME_STATUS;
  payload: GameStatus;
}

export interface SetPlayerBetAction {
  type: CoinflipActionEnum.SET_PLAYER_BET;
  payload: IPlayerBet;
}

export interface SetGameResultAction {
  type: CoinflipActionEnum.SET_GAME_RESULT;
  payload: IGameResult;
}

export interface ClearGameAction {
  type: CoinflipActionEnum.CLEAR_GAME;
}

export type CoinflipAction =
  | SetIsLoadingAction
  | SetErrorsAction
  | SetContractAction
  | SetGameStatusAction
  | SetPlayerBetAction
  | SetGameResultAction
  | ClearGameAction;
