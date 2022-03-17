import { AppActionCreators } from './app/action-creators';
import { CoinflipActionCreators } from './coinflip/action-creators';
import { AlertsActionCreators } from './alert/action-creators';

export const allActionCreators = {
  ...AppActionCreators,
  ...CoinflipActionCreators,
  ...AlertsActionCreators,
};
