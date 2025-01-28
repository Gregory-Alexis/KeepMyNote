import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Note } from '../models/Note';

export const fetchNotes = async (): Promise<Note[]> => {
  const NOTE_API_URL = 'http://localhost:5000/api/notes';

  const response = await axios.get(NOTE_API_URL);

  const data = await response.data;
  return data;
};

export const useNotes = (): UseQueryResult<Note[]> => {
  return useQuery({
    // The query key is used to cache the data
    queryKey: ['notes'],
    // The query function is called whenever the data is stale
    queryFn: fetchNotes,

    // Refetch the data every 10 seconds
    staleTime: 10000,
    // cacheTime: 60000, not working for now

    // Refetch the data every time the window regains focus
    refetchOnWindowFocus: true,
  });
};
