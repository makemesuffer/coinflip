import { IGameResult } from 'store/reducers/coinflip/types';

export const parseQuery = (query: any): IGameResult => {
  return {
    player: String(query[1]),
    winnings: Number(query[2]),
    headOrTails: Number(query[5]) === 0 ? 'HEADS' : 'TAILS',
  };
};
