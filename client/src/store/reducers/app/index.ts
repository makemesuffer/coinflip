import { CookieTool } from 'tools';
import { AppAction, AppActionEnum, AppState, IUser } from './types';

const initialState: AppState = {
  theme: CookieTool.getCookie('theme') || 'dark',
  user: {} as IUser,
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
    case AppActionEnum.CLEAR_USER:
      return { ...state, user: {} as IUser };
    default:
      return state;
  }
}
