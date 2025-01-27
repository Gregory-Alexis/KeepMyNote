import { useNotes } from '../queries/fetchNotes';
import CardsNoteList from './CardsNoteList';

const CardNote = () => {
  const { data: notes, isLoading, isError } = useNotes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading notes</div>;
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {notes?.map((note) => (
        <CardsNoteList key={note._id} note={note} title={note.title} content={note.content} />
      ))}
    </div>
  );
};
export default CardNote;
