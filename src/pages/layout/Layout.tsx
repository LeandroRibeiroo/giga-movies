import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

const Layout: React.FC = ({ children }): JSX.Element => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
