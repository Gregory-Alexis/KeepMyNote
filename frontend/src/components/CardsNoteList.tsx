import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CardsNoteListProps, FormData } from '../models/Note';
import { useDeleteNote } from '../mutations/deleteNote';
import { useUpdateNote } from '../mutations/updateNote';
import { useAuthStore } from '../store/auth_store';

const CardsNoteList = ({ title, content, note }: CardsNoteListProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteMutation = useDeleteNote();
  const updateMutation = useUpdateNote();

  const { user } = useAuthStore();

  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      title: note.title,
      note: note.content,
    },
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(note._id, {
        onError: () => alert('Failed to delete the note'),
      });
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    updateMutation.mutate(
      {
        noteID: note._id,
        note: { ...note, ...data },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: () => {
          alert('Failed to update the note');
        },
      }
    );
  };

  const handleEdit = () => {
    setValue('title', note.title);
    setValue('note', note.content);
    setIsEditing(true);
  };

  return (
    <div className='w-lg h-60 m-12 rounded-2xl bg-white shadow-[3px_3px_10px_5px_rgba(31,41,55,0.50)] p-4 overflow-auto break-words'>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <input
              {...register('title', { required: 'Title is required' })}
              className='w-full mb-2 p-2 border border-gray-300 rounded-lg'
              placeholder='Edit Title'
            />
          </div>
          <div>
            <textarea
              {...register('note', { required: 'Content is required' })}
              className='w-full h-24 p-2 border border-gray-300 rounded-lg'
              placeholder='Edit Content'
            />
          </div>
          <div className='flex space-x-4'>
            <button type='submit' className='bg-green-500 text-white rounded-lg p-2'>
              Save
            </button>
            <button
              type='button'
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              className='bg-gray-500 text-white rounded-lg p-2'
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className='relative'>
          <h3 className='text-center font-medium border-b-1 pb-2 '>{title}</h3>
          <p className='m-4'>{content}</p>

          {note.user === user?._id && (
            <div className='flex space-x-4'>
              <button
                onClick={handleEdit}
                className='bg-blue-500 text-white rounded-lg p-2 w-20 hover:bg-blue-400 transform duration-150 hover:scale-105'
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className='bg-black text-white rounded-full px-2 absolute right-0 top-0 transform duration-150 hover:scale-120'
              >
                X
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardsNoteList;
