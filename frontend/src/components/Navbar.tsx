import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/auth_store';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <nav className='bg-gray-800 text-white flex justify-between items-center p-4'>
      {isAuthenticated && <span className='text-2xl'>Welcome {user?.username}</span>}

      <Link to='/' className=' text-2xl font-bold'>
        Keep My Notes
      </Link>

      <div className='flex justify-end space-x-4 '>
        <Link
          to='/'
          className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
        >
          Home
        </Link>
        {!isAuthenticated ? (
          <Link
            to='login'
            className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
          >
            Logout
          </button>
        )}

        {!isAuthenticated && (
          <Link
            className='bg-gray-700 px-4 py-2 rounded transform transition duration-300 hover:bg-gray-500'
            to='/signup'
          >
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
