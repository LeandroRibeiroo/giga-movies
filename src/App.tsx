import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Routes } from './config/routes';

function App() {
  return (
    <Router>
      <Route
        component={(props: JSX.IntrinsicAttributes) => (
          <>
            <Header {...props} />
            <Routes />
            <Footer />
          </>
        )}
      />
    </Router>
  );
}

export default App;
