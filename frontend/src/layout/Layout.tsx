import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleToggleButton = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    };
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []);

  return (
    <>
      <Navbar width={width} toggle={toggle} handleToggleButton={handleToggleButton} />
      {toggle && <MobileNavbar />}
      <main className='min-h-screen bg-gray-200'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
