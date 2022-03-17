import { CookieTool } from 'tools';

import { AppAction, AppActionEnum, AppState, IPlays, IUser } from './types';

const initialState: AppState = {
  theme:
    (CookieTool.getCookie('theme') as 'light' | 'dark' | 'cyberpunk') || 'dark',
  user: {} as IUser,
  recentPlays: [] as IPlays[],
  topPlayers: [] as IPlays[],
  flag: 'recent',
  totalFlips: 0,
};

export default function appReducer(
  state = initialState,
  action: AppAction
): AppState {
  switch (action.type) {
    case AppActionEnum.SET_THEME:
      return { ...state, theme: action.payload };
    case AppActionEnum.SET_USER:
      return { ...state, user: action.payload };
    case AppActionEnum.SET_RECENT_PLAYS:
      return { ...state, recentPlays: action.payload };
    case AppActionEnum.SET_TOP_PLAYERS:
      return { ...state, topPlayers: action.payload };
    case AppActionEnum.SET_FLAG:
      return { ...state, flag: action.payload };
    case AppActionEnum.SET_TOTAL_FLIPS:
      return { ...state, totalFlips: action.payload };
    case AppActionEnum.CLEAR_USER:
      return { ...state, user: {} as IUser };
    default:
      return state;
  }
}
