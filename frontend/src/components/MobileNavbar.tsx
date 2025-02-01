import { Link } from 'react-router-dom';

const MobileNavbar = () => {
  return (
    <nav className='fixed right-0 top-0 flex h-screen items-center w-64 z-10 text-center bg-gray-800 text-white'>
      <ul className='flex flex-col mt-2 text-2xl w-screen lg:flex-row'>
        <div className='hover:bg-blue-200'>
          <li className='my-5 md:mr-4 '>
            <Link to='/'>Home</Link>
          </li>
        </div>
        <div className='hover:bg-blue-200'>
          <li className='my-5 md:mr-4'>
            <Link to='/login'>Login</Link>
          </li>
        </div>
        <div className='hover:bg-blue-200'>
          <li className='my-5 md:mr-4'>
            <Link to='/signup'>Singup</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
