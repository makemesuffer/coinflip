import dynamic from 'next/dynamic';

// const Footer = dynamic(() => import('../Footer/Footer'), { ssr: false });
// const Header = dynamic(() => import('../Header/Header'), { ssr: false });
import { Header } from 'components/layout/Header';
import { Footer } from '../Footer';

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: React.FC<IWrapper> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="mb-auto flex justify-center">
        <Header />
      </div>
      <main>
        <div>{children}</div>
      </main>
      <div className="mt-auto flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Wrapper;
