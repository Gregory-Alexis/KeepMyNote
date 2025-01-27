import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Note } from '../models/Note';

const NOTE_API_URL = 'http://localhost:5000/api/notes';

export const deleteNote = async (noteID: string): Promise<Note> => {
  const response = await axios.delete(`${NOTE_API_URL}/delete/${noteID}`);
  return response.data;
};

export const useDeleteNote = (): UseMutationResult<Note, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,

    onMutate: async (noteID: string) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      const previousNotes = queryClient.getQueryData<Note[]>(['notes']);

      queryClient.setQueryData<Note[]>(['notes'], (oldNotes) =>
        (oldNotes || []).filter((note) => note._id !== noteID)
      );

      return { previousNotes };
    },

    onError: (error, _, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes);
      }
      console.error('Failed to delete note:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
