import { create } from 'zustand';
import { Repo } from '../Types';

interface SearchValue {
  inputValue: string;
  onChange: (value: string) => void;
}

interface UserValues {
  userName: string;
  userRepos: UserRepos[];
  setUserRepos: (repos: UserRepos[]) => void;
  setUserName: (value: string) => void;
}

interface UserRepos {
  name: string;
  url: string;
}

export interface ReposValue {
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
}

export const useSearch = create<SearchValue>((set) => ({
  inputValue: localStorage.getItem('inputValue') || '',
  onChange: (value: string) => set({ inputValue: value }),
  loading: false,
  error: null,
}));

export const useUser = create<UserValues>((set) => ({
  userName: '',
  userRepos: [],
  setUserRepos: (repos) => set({ userRepos: repos }),
  setUserName: (value: string) => set({ userName: value }),
  loading: false,
  error: null,
}));

export const useRepos = create<ReposValue>((set) => ({
  repos: [],
  setRepos: (repos) => set({ repos: repos }),
  loading: false,
  error: null,
}));
