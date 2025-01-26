export type Note = {
  _id: string;
  title: string;
  content: string;
  userID: string | undefined;
};

// Define a context type to store the previous notes
export type MutationContext = {
  // Store the previous notes so we can roll back if there is an error
  previousNotes?: Note[];
};

export type FormData = {
  title: string;
  note: string;
};
