import { BigNumber } from 'ethers';

interface IGames {
  amountWon: BigNumber;
  blockNumber: number;
  didPlayerWin: boolean;
  headsOrTails: BigNumber;
  playerAddress: string;
  randomNonce: BigNumber;
}

export const parseGames = (games: IGames[]) => {
  if (games) {
    return games.map((game: IGames) => {
      return {
        amountWon: Number(game.amountWon),
        blockNumber: game.blockNumber,
        didPlayerWin: game.didPlayerWin,
        headsOrTails: Number(game.headsOrTails),
        playerAddress: game.playerAddress,
        randomNonce: Number(game.randomNonce),
      };
    });
  }
};
