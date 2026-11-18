import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { NotFound } from '@/src/views/NotFound';
import { Overview } from '@/src/views/Overview';
import { Package } from '@/src/views/Package';
import { Playground } from '@/src/views/Playground';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';


export default function App () {
  const { pathname } = useLocation();
  useEffect( () => { window.scrollTo( 0, 0 ) }, [ pathname ] );

  return (
    <>
      <Header />

      <main className= 'mx-auto my-8 min-h-screen max-w-7xl px-4 sm:my-12 sm:px-6'>
        <Routes>
          <Route path= '/pkg/:id' element= { <Package /> } />
          <Route path= '/pkg/:id/playground' element= { <Playground /> } />

          <Route path= '/' element= { <Overview /> } />
          <Route path= '*' element= { <NotFound /> } />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
