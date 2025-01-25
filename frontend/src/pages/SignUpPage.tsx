import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-600'>Keep My Notes</h1>
        <p className='text-lg text-gray-700 mt-2'>Join the community</p>
      </div>

      <form className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <div className='mb-6'>
          <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>
            Username
          </label>
          <input
            type='text'
            id='firstname'
            placeholder='John Doe'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='John_Doe@yourmail.com'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Your password'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
          />
        </div>

        <div className='mb-6'>
          <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-2'>
            Confirm password
          </label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm your password'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
          />
        </div>

        <button
          type='submit'
          className='w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition'
        >
          Sign up
        </button>

        <p className='mt-6 text-center text-gray-700'>
          Already have an account ?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUpPage;
