import { CoinflipState, CoinflipAction, CoinflipActionEnum } from './types';

const initialState: CoinflipState = {
  contractConnection: {
    contract: null,
    connected: false,
  },
  errors: [],
  isLoading: false,
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
    case CoinflipActionEnum.SET_CONTRACT:
      return {
        ...state,
        contractConnection: action.payload,
      };
    default:
      return state;
  }
}
