import { Link } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import './footer.scss';

const Footer = (): JSX.Element => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to="/">GigaMovies</Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Início</Link>
            <Link to="/">Entre em contato</Link>
            <Link to="/">Termos de serviço</Link>
            <Link to="/">Sobre nós</Link>
          </div>

          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Política de privacidade</Link>
          </div>

          <div className="footer__content__menu">
            <Link to="/">Você precisa assistir!</Link>
            <Link to="/">Lançamentos recentes</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
