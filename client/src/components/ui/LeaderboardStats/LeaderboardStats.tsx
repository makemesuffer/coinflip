const LeaderboardStats: React.FC = () => {
  return (
    <div className="grid-flow-row md:grid-flow-col w-full shadow stats">
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Flips</div>
        <div className="stat-value">310M</div>
        <div className="stat-desc text-success">↗︎ 200 (10%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Won</div>
        <div className="stat-value text-success">4,200</div>
        <div className="stat-desc text-success">↗︎ 400 (22%)</div>
      </div>
      <div className="stat place-items-center place-content-center">
        <div className="stat-title">Total Loss</div>
        <div className="stat-value text-error">1,200</div>
        <div className="stat-desc text-error">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default LeaderboardStats;
