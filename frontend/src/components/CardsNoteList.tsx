type CardsNoteListProps = {
  title: string;
  content: string;
};

const CardsNoteList = ({ title, content }: CardsNoteListProps) => {
  return (
    <div className='w-lg h-60 m-12 rounded-2xl bg-white shadow-[3px_3px_10px_5px_rgba(31,41,55,0.50)] p-4 overflow-auto break-words'>
      <h3 className='text-center font-medium border-b-1 pb-2'>{title}</h3>
      <p className='m-4'>{content}</p>
    </div>
  );
};
export default CardsNoteList;
