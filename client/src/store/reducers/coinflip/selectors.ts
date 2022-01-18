import { RootState } from '../../index';

const selectContract = (state: RootState): any =>
  state.coinflip.contractConnection.contract;

export const coinflipSelectors = {
  selectContract,
};
