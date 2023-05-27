import { useEffect } from 'react';
import { usePagination, useRepos, useUser } from '../../zustand/store';
import { calcPagination } from '../../helpers';
import { Repo } from '../../Types';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const { activePage, pageNumbers, setActivePage, setPaginatedRepos, setPages, setPageNumbers } =
    usePagination();

  const { userActive, userRepos } = useUser();
  const { repos } = useRepos();

  const updatePagination = (array: Repo[], pageNumber: number) => {
    const { pages, pageNumbers } = calcPagination(array);
    setPages(pages);
    setPageNumbers(pageNumbers);
    setPaginatedRepos(array.slice((pageNumber - 1) * 10, pageNumber * 10));
  };

  useEffect(() => {
    if (!userActive && localStorage.getItem('pageNumber')) {
      const pageNumber = Number(localStorage.getItem('pageNumber'));
      setPaginatedRepos(repos.slice((pageNumber - 1) * 10, pageNumber * 10));
    } else {
      setPaginatedRepos(repos.slice(0, 10));
    }
  }, [userActive, repos, setPaginatedRepos]);

  useEffect(() => {
    if (userActive && localStorage.getItem('pageNumber')) {
      const pageNumber = Number(localStorage.getItem('pageNumber'));
      setPaginatedRepos(userRepos.slice((pageNumber - 1) * 10, pageNumber * 10));
    } else {
      setPaginatedRepos(userRepos.slice(0, 10));
    }
  }, [userActive, userRepos, setPaginatedRepos]);

  const handlePageClick = (pageNumber: number) => {
    localStorage.setItem('pageNumber', String(pageNumber));
    setActivePage(pageNumber);

    if (userActive) {
      updatePagination(userRepos, pageNumber);
    } else {
      updatePagination(repos, pageNumber);
    }
  };

  return (
    <ul className={styles.pagination} data-cy="pagination">
      {pageNumbers.map((pageNumber, i) => (
        <li
          className={`${styles.pagination__item} ${
            pageNumber === activePage ? styles.pagination__item_active : ''
          }`}
          key={pageNumber}
          data-cy={`paginationItem${i}`}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
