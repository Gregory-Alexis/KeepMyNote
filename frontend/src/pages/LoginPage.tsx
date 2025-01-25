import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-600'>Keep My Notes</h1>
        <p className='text-lg text-gray-800 mt-2'>Connect and share your notes</p>
      </div>

      <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <div className='mb-6'>
          <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
            value={''}
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Entrez your password'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
            value={''}
            required
          />
        </div>

        <button
          type='submit'
          className='w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition'
        >
          Login
        </button>

        <p className='mt-6 text-center text-gray-700'>
          Pas encore de compte ?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
