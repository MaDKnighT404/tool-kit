import { Repo } from '../Types';

export function calcPagination(array: Repo[]) {
  const pages = Math.round(array.length / 10);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);
  return { pages, pageNumbers };
}

export function formatDate(date: string) {
  if (!date) {
    return null;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formattedDate;
}
