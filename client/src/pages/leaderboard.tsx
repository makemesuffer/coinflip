import type { NextPage } from 'next';

import { Wrapper } from 'components/layout/Wrapper';
import { LeaderboardStats } from 'components/ui/LeaderboardStats';
import { TopGainers } from 'components/ui/TopGainers';

const Leaderboard: NextPage = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-between gap-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center md:text-left text-xl font-extrabold p-2">
            Stats
          </h3>
          <LeaderboardStats />
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
