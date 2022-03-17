import dynamic from 'next/dynamic';

export { default as RecentPlays } from './RecentPlays';
export const RecentPlaysNoSSR = dynamic(() => import('./RecentPlays'), {
  ssr: false,
});
