import { useForm } from 'react-hook-form';

import { useAddNote } from '../mutations/addNote';
import { Note, FormData } from '../models/Note';
import { useAuthStore } from '../store/auth_store';

const FormInput = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const addMutation = useAddNote();
  const { user, isAuthenticated } = useAuthStore();

  const onSubmit = (data: FormData) => {
    const newNote: Note = {
      _id: Date.now().toString(),
      title: data.title,
      content: data.note,
      user: user?._id,
    };

    addMutation.mutate(newNote, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error('Failed to add note:', error);
      },
    });

    if (!isAuthenticated) {
      alert('Please log in to add a note');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='m-6 w-xs rounded-2xl shadow-[3px_3px_10px_5px_rgba(31,41,55,0.50)]  xl:w-2/8'
    >
      <div className='flex flex-col items-center w-full bg-white p-5 rounded-lg relative'>
        <input
          placeholder='Title'
          type='text'
          aria-label='Title'
          className='outline-none w-full mb-2 placeholder:text-gray-500 font-semibold border-b-1'
          {...register('title', {
            required: true,
            maxLength: { value: 30, message: 'The title cannot be longer than 30 characters' },
          })}
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        <textarea
          placeholder='Write your note...'
          aria-label='Write your note...'
          className='outline-none w-full h-24 cursor-auto font-light placeholder:text-gray-500 placeholder:font-semibold'
          style={{ resize: 'none' }}
          {...register('note', {
            required: true,
            maxLength: { value: 200, message: 'The note cannot be longer than 200 characters' },
          })}
        />
        {errors.note && <p className='text-red-500'>{errors.note.message}</p>}
        <button
          type='submit'
          className='bg-gray-800 text-white px-4 py-2 rounded-full absolute bottom-2 right-2'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default FormInput;
