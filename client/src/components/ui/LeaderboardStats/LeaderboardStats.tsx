import { IStatsData } from 'models/IStatsData';

interface IProps {
  data: IStatsData;
}

const LeaderboardStats: React.FC<IProps> = ({ data }) => {
  return (
    <div className="grid-flow-row md:grid-flow-col w-full shadow stats">
      <div className="stat place-items-center place-content-center">
        <div className="stat-title text-xl">Total Flips</div>
        <div className="stat-value">{data.totalGames}</div>
        <div className="stat-desc text-success">↗︎ 200 (10%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title text-xl">Total Won</div>
        <div className="stat-value text-success">{data.wins}</div>
        <div className="stat-desc text-success">↗︎ 400 (22%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title text-xl">Total Loss</div>
        <div className="stat-value text-error">{data.losses}</div>
        <div className="stat-desc text-error">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
