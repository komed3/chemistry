import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { Home } from '@/src/views/Home';
import { Package } from '@/src/views/Package';
import { Route, Routes } from 'react-router';


export default function App () {
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
