import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { SignUpModel } from '../models/SignUp';
import { useAuthStore } from '../store/auth_store';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpModel>();

  const { signup } = useAuthStore();

  const SignUpHandler: SubmitHandler<SignUpModel> = async (data) => {
    try {
      await signup(data.username, data.email, data.password);
    } catch (error: any) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-600'>Keep My Notes</h1>
        <p className='text-lg text-gray-700 mt-2'>Join the community</p>
      </div>

      <form
        onSubmit={handleSubmit(SignUpHandler)}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
      >
        <div className='mb-6'>
          <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>
            Username
          </label>
          <input
            type='text'
            id='username'
            placeholder='John Doe'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'username must be at least 3 characters long' },
            })}
          />
          {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
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
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
            })}
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
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
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className='text-red-500'>{errors.confirmPassword.message}</p>
          )}
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
