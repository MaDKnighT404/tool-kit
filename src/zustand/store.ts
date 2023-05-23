import { create } from 'zustand';
import { Repo } from '../Types';

interface SearchValue {
  inputValue: string;
  onChange: (value: string) => void;
}

interface UserValues {
  userName: string;
  userRepos: UserRepos;
  setUserRepos: (repos: Pick<UserRepos, 'nodes'>) => void;
  setUserName: (value: string) => void;
}

interface UserRepos {
  totalCount?: number;
  nodes?: {
    name: string;
    url: string;
  }[];
}

// interface ReposValue {
//   repos: Repo[];
//   getRepos: () => void;
// }

export const useSearch = create<SearchValue>((set) => ({
  inputValue: localStorage.getItem('inputValue') || '',
  onChange: (value: string) => set({ inputValue: value }),
  loading: false,
  error: null,
}));

export const useUser = create<UserValues>((set) => ({
  userName: '',
  userRepos: [],
  setUserRepos: (repos: Pick<UserRepos, 'nodes'>) => set({ userRepos: repos }),
  setUserName: (value: string) => set({ userName: value }),
  loading: false,
  error: null,
}));

// export const useRepos = create<ReposValue>((set) => ({
//   repos: [],
//   getRepos: () => {
//     return { repos2: [1, 2, 3] };
//   },
//   loading: false,
//   error: null,
// }));
