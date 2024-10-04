import React, { useState } from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';

function Layout() {
  const [basketCount, setBasketCount] = useState(0);

  return (
    <div className='flex flex-col justify-between'>
      <Header basketCount={basketCount} /> {/* Pass basketCount to Header */}
      <Outlet context={{ setBasket: setBasketCount, basketCount }} />
      {/* Use context to pass props */}
      <Footer />
    </div>
  );
}

export default Layout;
