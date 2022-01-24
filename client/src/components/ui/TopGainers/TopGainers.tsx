const TopGainers: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Address</th>
            <th>Net Gains</th>
            <th>Last Flip</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover cursor-pointer">
            <th>1</th>
            <td>2323242</td>
            <td>20 MATIC</td>
            <td>3 hours ago</td>
          </tr>
          <tr className="hover cursor-pointer">
            <th>2</th>
            <td>2323242</td>
            <td>18 MATIC</td>
            <td>3 hours ago</td>
          </tr>
          <tr className="hover cursor-pointer">
            <th>3</th>
            <td>2323242</td>
            <td>14 MATIC</td>
            <td>3 hours ago</td>
          </tr>
          <tr className="hover cursor-pointer">
            <th>4</th>
            <td>2323242</td>
            <td>10 MATIC</td>
            <td>3 hours ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopGainers;
