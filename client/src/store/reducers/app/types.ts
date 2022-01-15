export interface IUser {
  account: string;
  cashAmount: number;
}

export interface AppState {
  theme: string;
  user: IUser;
}

export enum AppActionEnum {
  SET_THEME = 'SET_THEME',
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}

export interface SetThemeAction {
  type: AppActionEnum.SET_THEME;
  payload: string;
}

export interface SetUserAction {
  type: AppActionEnum.SET_USER;
  payload: IUser;
}

export interface ClearUserAction {
  type: AppActionEnum.CLEAR_USER;
}

export type AppAction = SetThemeAction | SetUserAction | ClearUserAction;
