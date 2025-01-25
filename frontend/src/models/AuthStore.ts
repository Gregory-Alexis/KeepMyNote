import { User } from './User';

export type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
  signup: (username: string, email: string, password: string) => Promise<void>;
};
