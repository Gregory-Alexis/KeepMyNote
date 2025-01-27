import axios from 'axios';
import { Note } from '../models/Note';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

const NOTE_API_URL = 'http://localhost:5000/api/notes';

const updateNote = async ({ noteID, note }: { noteID: string; note: Note }): Promise<Note> => {
  const response = await axios.put(`${NOTE_API_URL}/update/${noteID}`, note);
  return response.data;
};

export const useUpdateNote = (): UseMutationResult<Note, Error, { noteID: string; note: Note }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,

    onMutate: async ({ noteID, note }) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      queryClient.setQueryData<Note[]>(['notes'], (oldNotes) =>
        (oldNotes || []).map((n) => (n._id === noteID ? { ...n, ...note } : n))
      );

      return { previousNotes };
    },

    onError: (error, _, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
      console.error('Failed to update note:', error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
