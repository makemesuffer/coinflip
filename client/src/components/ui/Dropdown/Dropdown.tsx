import { Button } from 'components/common/Button';
import { RecentPlays } from '../RecentPlays';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';

const Dropdown: React.FC = () => {
  const { flag } = useTypedSelector((state) => state.app);
  const { setFlag } = useActions();

  return (
    <div className="dropdown dropdown-end">
      <Button>Today</Button>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96"
      >
        <div className="grid grid-cols-2 items-center gap-3 p-2">
          <Button
            additionalClass={flag === 'recent' ? 'btn-active' : 'btn-outline'}
            onClick={() => setFlag('recent')}
          >
            Recent
          </Button>
          <Button
            additionalClass={flag === 'top wins' ? 'btn-active' : 'btn-outline'}
            onClick={() => setFlag('top wins')}
          >
            Top Wins
          </Button>
        </div>
        <RecentPlays flag={flag} />
      </ul>
    </div>
  );
};
export default Dropdown;
