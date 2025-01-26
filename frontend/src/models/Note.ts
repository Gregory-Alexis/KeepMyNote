export type Note = {
  id: string;
  title: string;
  content: string;
  userID: string;
};

// Define a context type to store the previous notes
export type MutationContext = {
  // Store the previous notes so we can roll back if there is an error
  previousNotes?: Note[];
};
