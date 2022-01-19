import { IStatsData } from 'models/IStatsData';

const LeaderboardStats: React.FC<any> = ({ data }) => {
  return (
    <div className="grid-flow-row md:grid-flow-col w-full shadow stats">
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Flips</div>
        <div className="stat-value">{data.totalGames}</div>
        <div className="stat-desc text-success">↗︎ 200 (10%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Won</div>
        <div className="stat-value text-success">{data.wins}</div>
        <div className="stat-desc text-success">↗︎ 400 (22%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Loss</div>
        <div className="stat-value text-error">{data.losses}</div>
        <div className="stat-desc text-error">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
