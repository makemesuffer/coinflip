import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Wrapper } from 'components/layout/Wrapper';
import { LeaderboardStats } from 'components/ui/LeaderboardStats';
import { TopGainers } from 'components/ui/TopGainers';
import useContract from 'hooks/useContract';
import { IStatsData } from 'models/IStatsData';
// import { animate } from 'animations/coinflip';

const Leaderboard: NextPage = () => {
  const contract = useContract();
  const [data, setData] = useState<IStatsData>({} as IStatsData);

  useEffect(() => {
    const getValues = async () => {
      const wins = await contract.playerWins();
      const losses = await contract.playerLosses();
      setData({
        wins: Number(wins),
        losses: Number(losses),
        totalGames: Number(wins) + Number(losses),
      });
    };
    contract && getValues();
  }, [contract]);

  // animate();

  return (
    <Wrapper>
      <div className="flex flex-col justify-between gap-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center md:text-left text-2xl font-extrabold p-2">
            Stats
          </h3>
          <LeaderboardStats data={data} />
        </div>
        <div className="card card-bordered w-11/12 mx-auto">
          <h3 className="text-left text-2xl font-extrabold p-4">Top Gainers</h3>
          <TopGainers />
        </div>
        <div className="card card-bordered w-11/12 mx-auto">
          <h3 className="text-left text-2xl font-extrabold p-4">Rankings</h3>
          <TopGainers />
        </div>
      </div>
    </Wrapper>
  );
};

{
  /* <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 flex-1">
  <div className="w-full space-y-8 max-w-2xl"></div>
</div>; */
}

export default Leaderboard;
