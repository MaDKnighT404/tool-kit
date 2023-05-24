import { Repos } from '../Types';
import { UserRepos } from '../zustand/store';
export function calcPagination(array: UserRepos[] | Repos[]) {
  const pages = Math.round(array.length / 10);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
  return { pages, pageNumbers };
}
