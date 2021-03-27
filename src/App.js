import './App.css';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return <Fragment>
    <Header />
    <AppRoutes />
    <Footer />
  </Fragment>
}

export default App;
