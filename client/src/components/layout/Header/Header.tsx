import { useTheme } from 'next-themes';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

import { Button } from 'components/common/Button';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { Identicon } from 'components/common/Identicon';
import { Modal } from 'components/common/Modal';
import { IUser } from 'store/reducers/app/types';
import { Dropdown } from 'components/ui/Dropdown';
import { AlertDrawer } from 'components/ui/AlertDrawer';
import { RecentPlaysNoSSR } from 'components/ui/RecentPlays';

const Header = () => {
  const { theme, user, flag } = useTypedSelector((state) => state.app);
  const { setThemeCookie, setGameStatus, setFlag } = useActions();
  const { theme: _theme, setTheme } = useTheme();
  const { deactivate } = useWeb3React();
  const { setUser } = useActions();
  const [showMobileToday, setShowMobileToday] = useState<boolean>(false);

  const deactivateAccount = () => {
    try {
      deactivate();
      setUser({} as IUser);
      setGameStatus('not started');
    } catch (err) {}
  };

  const changeTheme = () => {
    if (theme === 'dark') {
      setThemeCookie('light');
      setTheme('light');
    } else if (theme === 'light') {
      setThemeCookie('cyberpunk');
      setTheme('cyberpunk');
    } else if (theme === 'cyberpunk') {
      setThemeCookie('dark');
      setTheme('dark');
    }
  };

  const cardClass = classNames('card card-bordered cursor-pointer', {
    'hover:bg-slate-700': theme === 'dark',
    'hover:bg-zinc-200': theme === 'light',
    'hover:bg-yellow-300': theme === 'cyberpunk',
  });

  return (
    <header className="container md:p-8 p-4">
      <div className="hidden md:block">
        <AlertDrawer />
      </div>
      <div className="gap-5 flex flex-row-reverse items-center md:justify-start">
        {user.cashAmount && (
          <label htmlFor="account-modal" className={cardClass}>
            <div className="hidden md:flex items-center px-3 gap-2">
              <Identicon address={user.account} />
              <div className="text-center">
                <p className="text-sm font-bold">ADDRESS:</p>
                <p className="text-sm">{user.account.slice(0, 6)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">BALANCE:</p>
                <p className="text-sm ml-auto">{user.cashAmount} MATIC</p>
              </div>
            </div>
          </label>
        )}
        <Button
          data-set-theme={theme}
          data-act-class="ACTIVECLASS"
          onClick={changeTheme}
        >
          {theme}
        </Button>
        <div className="hidden md:block">
          <Dropdown />
        </div>
        <div className="block md:hidden">
          <Button onClick={() => setShowMobileToday(!showMobileToday)}>
            Today
          </Button>
        </div>
      </div>
      {user.cashAmount && (
        <label htmlFor="account-modal" className="md:hidden px-2 pt-5">
          <div className={cardClass}>
            <div className="flex items-center px-3 gap-2">
              <Identicon address={user.account} />
              <div className="text-center">
                <p className="text-sm font-bold">ADDRESS:</p>
                <p className="text-sm">{user.account.slice(0, 6)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold">BALANCE:</p>
                <p className="text-sm ml-auto">{user.cashAmount} MATIC</p>
              </div>
            </div>
          </div>
        </label>
      )}
      <input type="checkbox" id="account-modal" className="modal-toggle" />
      <Modal forWhat="account-modal">
        <div className="flex flex-col gap-5 py-4 px-2 sm:px-2 lg:px-2 flex-1 items-center">
          <h3 className="text-2xl font-extrabold">Account Info</h3>
          <Identicon address={user.account} size={50} />
          <div className="md:flex-row flex flex-col gap-5 md:gap-0">
            <div className="flex flex-col text-center md:w-1/3 w-9/12 mx-auto">
              <h5 className="text-xl font-bold py-1">Address:</h5>
              <p className="text-md break-words">{user.account}</p>
            </div>
            <div className="flex flex-col text-center md:w-1/3 w-9/12 mx-auto">
              <h5 className="text-xl font-bold py-1">Balance:</h5>
              <p className="text-md">{user.cashAmount} MATIC</p>
            </div>
          </div>
          <div className="mt-2 flex flex-col divide-y w-full text-center">
            <h5 className="text-xl font-bold py-2">Your Recent Flips</h5>
            <p className="text-md py-2">Need to think of...</p>
          </div>
        </div>
        <div className="modal-action pb-3">
          <label
            className="btn btn-primary btn-sm lg:btn-md w-1/2"
            htmlFor="account-modal"
            onClick={deactivateAccount}
          >
            Deactivate
          </label>
          <label className="btn btn-sm lg:btn-md w-1/2" htmlFor="account-modal">
            Close
          </label>
        </div>
      </Modal>
      <div className="block md:hidden">
        {showMobileToday && (
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-96"
          >
            <div className="grid grid-cols-2 items-center gap-3 p-2">
              <Button
                additionalClass={
                  flag === 'recent' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => setFlag('recent')}
              >
                Recent
              </Button>
              <Button
                additionalClass={
                  flag === 'top wins' ? 'btn-active' : 'btn-outline'
                }
                onClick={() => setFlag('top wins')}
              >
                Top Wins
              </Button>
            </div>
            <RecentPlaysNoSSR flag={flag} />
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
