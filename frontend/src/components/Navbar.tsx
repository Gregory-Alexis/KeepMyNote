import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth_store';

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <nav className='bg-gray-800 text-white flex justify-between items-center p-4'>
      {isAuthenticated && <span className='text-2xl'>{user?.username}</span>}

      <span className=' text-2xl font-bold'>Keep My Notes</span>

      <ul className='flex justify-end space-x-4 '>
        <li className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'>
          <Link to='/login'>{isAuthenticated ? 'Logout' : 'Login'}</Link>
        </li>
        {!isAuthenticated && (
          <li className='bg-gray-700 px-4 py-2 rounded transform transition duration-300 hover:bg-gray-500'>
            <Link to='/signup'>Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
