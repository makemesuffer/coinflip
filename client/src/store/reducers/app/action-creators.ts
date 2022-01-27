import { AppDispatch } from 'store';
import { CookieTool } from 'tools';

import {
  AppActionEnum,
  ClearUserAction,
  IPlays,
  IUser,
  SetFlagAction,
  SetRecentPlaysAction,
  SetThemeAction,
  SetTopPlayersAction,
  SetTotalFlipsAction,
  SetUserAction,
} from './types';

export const AppActionCreators = {
  setTheme: (payload: 'light' | 'dark' | 'cyberpunk'): SetThemeAction => ({
    type: AppActionEnum.SET_THEME,
    payload,
  }),
  setThemeCookie:
    (payload: 'light' | 'dark' | 'cyberpunk') =>
    async (dispatch: AppDispatch) => {
      CookieTool.setCookie('theme', payload, {
        sameSite: 'lax',
      });
      dispatch(AppActionCreators.setTheme(payload));
    },
  setUser: (user: IUser): SetUserAction => ({
    type: AppActionEnum.SET_USER,
    payload: user,
  }),
  setRecentPlays: (plays: IPlays[]): SetRecentPlaysAction => ({
    type: AppActionEnum.SET_RECENT_PLAYS,
    payload: plays,
  }),
  setTopWins: (plays: IPlays[]): SetTopPlayersAction => ({
    type: AppActionEnum.SET_TOP_PLAYERS,
    payload: plays,
  }),
  setFlag: (flag: 'recent' | 'top wins'): SetFlagAction => ({
    type: AppActionEnum.SET_FLAG,
    payload: flag,
  }),
  clearUser: (): ClearUserAction => ({
    type: AppActionEnum.CLEAR_USER,
  }),
  setTotalFlips: (totalFlips: bigint): SetTotalFlipsAction => ({
    type: AppActionEnum.SET_TOTAL_FLIPS,
    payload: totalFlips,
  }),
};
