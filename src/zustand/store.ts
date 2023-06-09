import { create } from 'zustand';
import { Repo } from '../Types';

interface SearchValue {
  inputValue: string;
  onChange: (value: string) => void;
}

interface UserValues {
  userActive: boolean;
  userName: string;
  userRepos: Repo[];
  changeUserActive: (value: boolean) => void;
  setUserRepos: (repos: Repo[]) => void;
  setUserName: (value: string) => void;
}

interface ReposValue {
  repos: Repo[];
  setRepos: (repos: Repo[]) => void;
}

interface PaginationValues {
  pages: number;
  pageNumbers: number[];
  activePage: number;
  paginatedRepos: Repo[];
  setActivePage: (value: number) => void;
  setPaginatedRepos: (repos: Repo[]) => void;
  setPages: (value: number) => void;
  setPageNumbers: (value: number[]) => void;
}

interface RepoCardValues {
  isOpen: boolean;
  repoCard: Repo;
  setRepoCard: (repo: Repo) => void;
  setIsOpenRepoCard: (value: boolean) => void;
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
  paginatedRepos: [],
  pages: 1,
  pageNumbers: [],
  setPaginatedRepos: (repos) => set({ paginatedRepos: repos }),
  setActivePage: (value) => set({ activePage: value }),
  setPages: (value) => set({ pages: value }),
  setPageNumbers: (value) => set({ pageNumbers: value }),
  loading: false,
  error: null,
}));

export const useRepoCard = create<RepoCardValues>((set) => ({
  isOpen: Boolean(JSON.parse(localStorage.getItem('isOpen') as string)),
  repoCard: JSON.parse(localStorage.getItem('repoCard') as string),
  setRepoCard: (repo) => set({ repoCard: repo }),
  setIsOpenRepoCard: (value) => set({ isOpen: value }),
  loading: false,
  error: null,
}));
