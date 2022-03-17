import dynamic from 'next/dynamic';

export { default as Loader } from './Loader';
export const LoaderNoSSR = dynamic(() => import('./Loader'), {
  ssr: false,
});
