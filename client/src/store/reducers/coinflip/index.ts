import {
  CoinflipState,
  CoinflipAction,
  CoinflipActionEnum,
  IPlayerBet,
  IGameResult,
} from './types';

const initialState: CoinflipState = {
  contractConnection: {
    contract: null,
    connected: false,
  },
  errors: [],
  isLoading: false,
  gameStatus: 'not started',
  playerBet: {} as IPlayerBet,
  gameResult: {} as IGameResult,
};

export default function coinflipReducer(
  state = initialState,
  action: CoinflipAction
): CoinflipState {
  switch (action.type) {
    case CoinflipActionEnum.SET_ERRORS:
      return { ...state, errors: action.payload, isLoading: false };
    case CoinflipActionEnum.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case CoinflipActionEnum.SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload };
    case CoinflipActionEnum.SET_PLAYER_BET:
      return { ...state, playerBet: action.payload };
    case CoinflipActionEnum.CLEAR_GAME:
      return {
        ...state,
        errors: [],
        isLoading: false,
        gameStatus: 'betting',
        playerBet: {} as IPlayerBet,
        gameResult: {} as IGameResult,
      };
    case CoinflipActionEnum.SET_GAME_RESULT:
      return {
        ...state,
        gameResult: action.payload,
      };
    case CoinflipActionEnum.SET_CONTRACT:
      return {
        ...state,
        contractConnection: action.payload,
      };
    default:
      return state;
  }
}
