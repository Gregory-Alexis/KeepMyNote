import { User } from './User';

export type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};
