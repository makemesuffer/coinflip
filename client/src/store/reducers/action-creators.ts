import { AppActionCreators } from './app/action-creators';
import { CoinflipActionCreators } from './coinflip/action-creators';

export const allActionCreators = {
  ...AppActionCreators,
  ...CoinflipActionCreators,
};
