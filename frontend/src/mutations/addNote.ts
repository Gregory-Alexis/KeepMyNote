import axios from 'axios';
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

import { MutationContext, Note } from '../models/Note';

const NOTE_API_URL = 'http://localhost:5000/api/notes';

export const addNote = async (newNote: Note): Promise<any> => {
  const response = await axios.post(`${NOTE_API_URL}/create`, newNote);

  const data = response.data;
  return data;
};

export const useAddNote = (): UseMutationResult<Note, Error, Note> => {
  const queryClient = useQueryClient();

  // Use the useMutation hook to create a new note
  return useMutation<Note, Error, Note, MutationContext>({
    mutationFn: addNote,

    // When the mutation is successful, invalidate the notes query
    onMutate: async (newNote) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      // Store the previous notes so we can roll back if there is an error
      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      // Add the new note to the notes array
      queryClient.setQueryData<Note[]>(['notes'], (oldNotes) => [...(oldNotes || []), newNote]);

      return { previousNotes };
    },

    // If there is an error, roll back to the previous notes
    onError: (error, newNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context?.previousNotes);
      }
      console.error(`Error adding note:`, error);
    },

    // When the mutation is successful, invalidate the notes query
    onSettled: () => {
      // Invalidate the notes query so it will refetch the data
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
