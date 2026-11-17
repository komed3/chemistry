import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { Home } from '@/src/views/Home';
import { Package } from '@/src/views/Package';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';


export default function App () {
  const { pathname } = useLocation();
  useEffect( () => { window.scrollTo( 0, 0 ) }, [ pathname ] );

  return (
    <>
      <Header />

      <main className= 'mx-auto my-12 min-h-screen max-w-7xl px-6'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
          <Route path= '/pkg/:id' element= { <Package /> } />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
