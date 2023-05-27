import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../apollo/query';
import Pagination from '../Pagination';
import { useUser, usePagination } from '../../zustand/store';
import { calcPagination } from '../../helpers';
import styles from './ResultUser.module.scss';

const ResultUser = () => {
  const { userName, setUserName, setUserRepos, changeUserActive } = useUser();
  const { paginatedRepos, setPageNumbers, setActivePage } = usePagination();

  const { data, loading, error } = useQuery(GET_USER);

  useEffect(() => {
    if (data) {
      changeUserActive(true);
      const newReposArray = data.viewer.repositories.nodes.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ __typename, ...rest }: { __typename: string }) => rest
      );
      const userName = data.viewer.login;
      const { pageNumbers } = calcPagination(newReposArray);

      if (Number(localStorage.getItem('pageNumber')) > pageNumbers.length) {
        localStorage.setItem('pageNumber', '1');
        setActivePage(1);
      }

      setPageNumbers(pageNumbers);
      setUserRepos(newReposArray);
      setUserName(userName);
    }
  }, [data]);

  if (loading) {
    return <div className={styles.loader} />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <>
      {paginatedRepos?.length === 0 ? <h3>No repositories found!</h3> : ''}
      {paginatedRepos && !loading && (
        <div className="result">
          <h2 className={styles.result__title} data-cy="resultTitle">
            Hello {userName}!
          </h2>
          <h3 className={styles.result__message} data-cy="resultMessage">
            This is your repositories:
          </h3>
          <ul className={styles.result__list}>
            {paginatedRepos.map((repo) => (
              <li className={styles.result__item} key={repo.url}>
                <a href={repo.url} className={styles.result__link}>
                  <span className={styles.result__text}>{repo.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <Pagination />
        </div>
      )}
    </>
  );
};

export default ResultUser;
