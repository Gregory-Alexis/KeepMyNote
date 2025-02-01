import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/auth_store';
import { useDeleteUser } from '../mutations/deleteUser';

import { ToggleMobileNavbarButtonProps } from '../models/ToggleButton';
import ToggleMobileNavbarButton from './ToggleMobileNavbar';

const Navbar: React.FC<ToggleMobileNavbarButtonProps> = ({ width, toggle, handleToggleButton }) => {
  const { isAuthenticated, user, logout, deleteAccount } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const deleteAccountMutation = useDeleteUser();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account?')) {
      deleteAccountMutation.mutate(user?._id!, {
        onSuccess: () => {
          alert('Your account has been deleted');
          logout();
          navigate('/signup');
        },
        onError: () => alert('Failed to delete your account'),
      });
    }
  };

  return (
    <nav className='bg-gray-800 text-white flex justify-between items-center p-4'>
      {isAuthenticated && <span className='text-2xl'>Welcome {user?.username}</span>}

      <Link to='/' className='text-2xl font-bold'>
        Keep My Notes
      </Link>

      {width >= 1024 ? (
        <div className='flex justify-end space-x-4 '>
          {location.pathname !== '/' && (
            <Link
              to='/'
              className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
            >
              Home
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to='login'
              className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
            >
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className='bg-gray-700 px-4 py-2 rounded  transform transition duration-300 hover:bg-gray-500'
              >
                Delete Account
              </button>
            </>
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
      ) : (
        <ToggleMobileNavbarButton
          width={width}
          toggle={toggle}
          handleToggleButton={handleToggleButton}
        />
      )}
    </nav>
  );
};
export default Navbar;
