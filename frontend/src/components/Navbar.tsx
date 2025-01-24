import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white flex justify-between items-center p-4'>
      <h1 className=' text-2xl font-bold'>Keep My Notes</h1>
      <ul className='flex justify-end space-x-4 '>
        <li className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='bg-gray-700 px-4 py-2 rounded transform transition duration-300 hover:bg-gray-500'>
          <Link to='/signup'>Signup</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
