const FormInput = () => {
  return (
    <form className='mt-8 rounded-2xl shadow-[3px_3px_10px_5px_rgba(31,41,55,0.50)] xl:w-2/8 '>
      <div className='flex flex-col items-center w-full  bg-white p-5 rounded-lg relative'>
        <input
          placeholder='Title'
          name='title'
          type='text'
          aria-label='Title'
          value={''}
          className='outline-none w-full mb-2 placeholder:text-gray-500 font-semibold border-b-1'
        />

        <textarea
          placeholder='Write your note...'
          name='note'
          aria-label='Write your note...'
          value={''}
          className='outline-none  w-full h-24 cursor-auto font-light placeholder:text-gray-500 placeholder:font-semibold'
          style={{ resize: 'none' }}
        />
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
