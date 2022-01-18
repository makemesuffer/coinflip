
export interface IContractConnection {
  contract: any;
  connected: boolean;
}

export interface CoinflipState {
  contractConnection: IContractConnection;
  errors: string[];
  isLoading: boolean;
}

export enum CoinflipActionEnum {
  SET_ERRORS = 'SET_ERRORS',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_CONTRACT = 'SET_CONTRACT',
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

export type CoinflipAction =
  | SetIsLoadingAction
  | SetErrorsAction
  | SetContractAction;
