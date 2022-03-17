import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { getConnectors } from '../utils/getConnectors';

export default function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    getConnectors.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(getConnectors, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
