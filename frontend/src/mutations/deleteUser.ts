import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../models/User';

const USER_API_URL = 'http://localhost:5000/api/auth';

export const deleteUser = async (userID: string): Promise<User> => {
  const response = await axios.delete(`${USER_API_URL}/delete-account/${userID}`);
  return response.data;
};

export const useDeleteUser = (): UseMutationResult<User, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (userID) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousUsers = queryClient.getQueryData<User[]>(['users']);

      queryClient.setQueryData<User[]>(['users'], (oldUsers) =>
        (oldUsers || []).filter((u) => u._id !== userID)
      );

      return { previousUsers };
    },

    onError: (error, _, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      console.error('Failed to delete user:', error);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
