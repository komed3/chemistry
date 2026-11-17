import { Footer } from '@/src/components/layout/Footer';
import { Header } from '@/src/components/layout/Header';
import { Home } from '@/src/views/Home';
import { Package } from '@/src/views/Package';
import { Route, Routes } from 'react-router';


export default function App () {
  return (
    <>
      <Header />

      <main className= 'min-h-screen'>
        <Routes>
          <Route path= '/' element= { <Home /> } />
          <Route path= '/pkg/:id' element= { <Package /> } />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
