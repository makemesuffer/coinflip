import { AppDispatch } from 'store';
import { CookieTool } from 'tools';

import { AppActionEnum, ClearUserAction, IUser, SetThemeAction, SetUserAction } from './types';

export const AppActionCreators = {
  setTheme: (payload: string): SetThemeAction => ({
    type: AppActionEnum.SET_THEME,
    payload,
  }),
  setThemeCookie: (payload: string) => async (dispatch: AppDispatch) => {
    CookieTool.setCookie('theme', payload, {
      sameSite: 'lax',
    });
    dispatch(AppActionCreators.setTheme(payload));
  },
  setUser: (user: IUser): SetUserAction => ({
    type: AppActionEnum.SET_USER,
    payload: user,
  }),
  clearUser: (): ClearUserAction => ({
    type: AppActionEnum.CLEAR_USER,
  }),
};
