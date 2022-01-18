import { HTMLProps, useState } from 'react';

import { Button } from 'components/common/Button';
import { RecentPlays } from '../RecentPlays';

type DropdownProps = HTMLProps<HTMLDivElement> & {
  items: any[];
};

const Dropdown: React.FC<DropdownProps> = ({ items, ...props }) => {
  const [selectedValue, setSelectedValue] = useState<string>('recent');

  return (
    <div className="dropdown dropdown-end" {...props}>
      <Button>Today</Button>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96"
      >
        <div className="grid grid-cols-2 items-center gap-3 p-2">
          <Button
            additionalClass={
              selectedValue === 'recent' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => setSelectedValue('recent')}
          >
            Recent
          </Button>
          <Button
            additionalClass={
              selectedValue === 'top wins' ? 'btn-active' : 'btn-outline'
            }
            onClick={() => setSelectedValue('top wins')}
          >
            Top Wins
          </Button>
        </div>
        <RecentPlays />
      </ul>
    </div>
  );
};
export default Dropdown;
