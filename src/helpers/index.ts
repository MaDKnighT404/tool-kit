import { Repo } from '../Types';

export function calcPagination(array: Repo[]) {
  const pages = Math.round(array.length / 10);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
  return { pages, pageNumbers };
}
