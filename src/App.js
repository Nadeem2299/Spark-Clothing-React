import './App.css';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App () {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <HashRouter>
          <Header />
          <main className="container mt-5 pt-5">
            <AppRoutes />
          </main>
          <Footer />
        </HashRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
