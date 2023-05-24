import { create } from 'zustand';
import { Repo } from '../Types';

interface SearchValue {
  inputValue: string;
  onChange: (value: string) => void;
}

interface UserValues {
  userActive: boolean;
  userName: string;
  userRepos: UserRepos[];
  changeUserActive: (value: boolean) => void;
  setUserRepos: (repos: UserRepos[]) => void;
  setUserName: (value: string) => void;
}

interface UserRepos {
  name: string;
  url: string;
}

interface ReposValue {
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
}

interface PaginationValues {
  activePage: number;
  paginatedUserRepos: UserRepos[];
  setActivePage: (value: number) => void;
  setPaginatedUserRepos: (repos: UserRepos[]) => void;
}

export const useSearch = create<SearchValue>((set) => ({
  inputValue: localStorage.getItem('inputValue') || '',
  onChange: (value: string) => set({ inputValue: value }),
  loading: false,
  error: null,
}));

export const useUser = create<UserValues>((set) => ({
  userActive: true,
  userName: '',
  userRepos: [],
  changeUserActive: (value) => set({ userActive: value }),
  setUserRepos: (repos) => set({ userRepos: repos }),
  setUserName: (value) => set({ userName: value }),
  loading: false,
  error: null,
}));

export const useRepos = create<ReposValue>((set) => ({
  repos: [],
  setRepos: (repos) => set({ repos: repos }),
  loading: false,
  error: null,
}));

export const usePagination = create<PaginationValues>((set) => ({
  activePage: Number(localStorage.getItem('pageNumber')) || 1,
  paginatedUserRepos: [],
  setPaginatedUserRepos: (repos) => set({ paginatedUserRepos: repos }),
  setActivePage: (value) => set({ activePage: value }),
  loading: false,
  error: null,
}));
