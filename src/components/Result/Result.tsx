import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_REPOS from '../../apollo/query';
import Pagination from '../Pagination';
import { useUser, useSearch, useRepos, usePagination } from '../../zustand/store';
import { calcPagination } from '../../helpers';
import { Repos } from '../../Types';
import styles from './Result.module.scss';

const Result = () => {
  const { inputValue } = useSearch();
  const { userName, setUserName, setUserRepos, changeUserActive } = useUser();
  const { repos, setRepos } = useRepos();
  const { paginatedRepos, setPageNumbers, setActivePage } = usePagination();

  const { data, loading, error } = useQuery(GET_REPOS, {
    variables: { inputValue },
  });

  useEffect(() => {
    changeUserActive(false);

    if (data && inputValue) {
      const newReposArray = data.search.repos.map((obj: Repos) => obj.repo);
      const { pageNumbers } = calcPagination(newReposArray);

      if (Number(localStorage.getItem('pageNumber')) > pageNumbers.length) {
        localStorage.setItem('pageNumber', '1');
        setActivePage(1);
      }

      setPageNumbers(pageNumbers);
      setRepos(newReposArray);
    }

    if (data && !inputValue) {
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
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <div className={styles.result}>
      {!inputValue && !loading && (
        <>
          <h2 className={styles.result__title}>Hello {userName}!</h2>
          <h3 className={styles.result__message}>This is your repositories:</h3>
        </>
      )}
      <>
        <ul className={styles.result__list}>
          {repos?.length === 0 && inputValue && <h3>Nothing found!</h3>}

          {inputValue
            ? paginatedRepos.map((repo) => (
                <li className={styles.result__item} key={repo.url}>
                  <Link to="/repo" className={styles.result__link}>
                    <span className={styles.result__text}>Repository: {repo.name}</span>
                    <span className={styles.result__text}>Stars: {repo.stargazerCount}</span>
                    <span className={styles.result__text}>
                      <a href={repo.url} className={styles.result__gitlink}>
                        Github link
                      </a>
                    </span>
                    <span className={styles.result__text}>
                      {repo.defaultBranchRef
                        ? `Last commit: ${new Date(
                            repo.defaultBranchRef.target.history.edges[0].node.committedDate
                          ).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}`
                        : 'No commits found'}
                    </span>
                  </Link>
                </li>
              ))
            : paginatedRepos.map((repo) => (
                <li className={styles.result__item} key={repo.url}>
                  <span className={styles.result__text}>Repository: {repo.name}</span>
                  <span className={styles.result__text}>
                    <a href={repo.url} className={styles.result__link}>
                      Github link
                    </a>
                  </span>
                  <span className={styles.result__text}></span>
                </li>
              ))}
        </ul>
        <Pagination />
      </>
    </div>
  );
};

export default Result;
