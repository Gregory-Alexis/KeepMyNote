export type Note = {
  _id: string;
  title: string;
  content: string;
  user: string | undefined;
};

export type NewNote = {
  _id: string;
  title: string;
  content: string;
  user: string | undefined;
};

export type MutationContext = {
  previousNotes?: Note[];
};

export type FormData = {
  title: string;
  note: string;
};

export type CardsNoteListProps = {
  title: string;
  content: string;
  note: Note;
};
