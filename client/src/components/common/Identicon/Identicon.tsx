import { useEffect, useRef } from 'react';
// import { useWeb3React } from '@web3-react/core';
import Jazzicon from '@metamask/jazzicon';

interface IProps {
  address: string;
  size?: number;
}

// const StyledIdenticon = styled.div`
//   height: 1rem;
//   width: 1rem;
//   border-radius: 1.125rem;
//   background-color: black;
// `;

export default function Identicon({ address, size }: IProps) {
  const ref = useRef<HTMLDivElement>();
  //   const { account } = useWeb3React();

  useEffect(() => {
    // if (address && ref.current) {
    //   ref.current.innerHTML = '';
    //   ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)));
    // } else if (account && ref.current) {
    if (address && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(size || 36, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  return <div className="rounded-2xl pt-2" ref={ref as any} />;
}
