export interface IUser {
  account: string;
  cashAmount: number;
}

export interface IPlays {
  amountWon: number;
  blockNumber: number;
  didPlayerWin: boolean;
  headsOrTails: number;
  playerAddress: string;
  randomNonce: number;
}

export interface AppState {
  theme: 'light' | 'dark' | 'cyberpunk';
  user: IUser;
  recentPlays: IPlays[];
  topPlayers: IPlays[];
  flag: 'recent' | 'top wins';
  totalFlips: number;
}

export enum AppActionEnum {
  SET_THEME = 'SET_THEME',
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  SET_RECENT_PLAYS = 'SET_RECENT_PLAYS',
  SET_TOP_PLAYERS = 'SET_TOP_PLAYERS',
  SET_FLAG = 'SET_FLAG',
  SET_TOTAL_FLIPS = 'SET_TOTAL_FLIPS',
}

export interface SetRecentPlaysAction {
  type: AppActionEnum.SET_RECENT_PLAYS;
  payload: IPlays[];
}

export interface SetTopPlayersAction {
  type: AppActionEnum.SET_TOP_PLAYERS;
  payload: IPlays[];
}

export interface SetThemeAction {
  type: AppActionEnum.SET_THEME;
  payload: 'light' | 'dark' | 'cyberpunk';
}

export interface SetUserAction {
  type: AppActionEnum.SET_USER;
  payload: IUser;
}

export interface ClearUserAction {
  type: AppActionEnum.CLEAR_USER;
}

export interface SetFlagAction {
  type: AppActionEnum.SET_FLAG;
  payload: 'recent' | 'top wins';
}

export interface SetTotalFlipsAction {
  type: AppActionEnum.SET_TOTAL_FLIPS;
  payload: number;
}

export type AppAction =
  | SetThemeAction
  | SetUserAction
  | ClearUserAction
  | SetTopPlayersAction
  | SetRecentPlaysAction
  | SetFlagAction
  | SetTotalFlipsAction;
