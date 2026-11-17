import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { Home } from '@/src/views/Home';
import { Route, Routes } from 'react-router';


export default function App () {
  return (
    <>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
