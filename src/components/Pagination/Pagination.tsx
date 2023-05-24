import { useEffect } from 'react';
import styles from './Pagination.module.scss';
import { usePagination, useUser } from '../../zustand/store';

const Pagination = () => {
  const { activePage, setActivePage, setPaginatedUserRepos } = usePagination();
  const { userActive, userRepos } = useUser();

  useEffect(() => {
    if (localStorage.getItem('pageNumber')) {
      const pageNumber = Number(localStorage.getItem('pageNumber'));
      setPaginatedUserRepos(userRepos.slice((pageNumber - 1) * 10, pageNumber * 10));
    } else {
      setPaginatedUserRepos(userRepos.slice(0, 10));
    }
  }, [userRepos, setPaginatedUserRepos]);

  const pages = Math.trunc(userRepos.length / 10) + 1;
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const handlePageClick = (pageNumber: number) => {
    localStorage.setItem('pageNumber', String(pageNumber));
    setActivePage(pageNumber);
    setPaginatedUserRepos(userRepos.slice((pageNumber - 1) * 10, pageNumber * 10));
  };

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((pageNumber) => (
        <li
          className={`${styles.pagination__item} ${
            pageNumber === activePage ? styles.pagination__item_active : ''
          }`}
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
