import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../../apollo/query';
import Pagination from '../Pagination';
import { useUser, useSearch, useRepos, usePagination, useRepoCard } from '../../zustand/store';
import { calcPagination, formatDate } from '../../helpers';
import { Repos, Repo } from '../../Types';
import styles from './ResultRepos.module.scss';

const ResultRepos = () => {
  const { inputValue } = useSearch();
  const { changeUserActive } = useUser();
  const { repos, setRepos } = useRepos();
  const { paginatedRepos, setPageNumbers, setActivePage } = usePagination();
  const { setRepoCard, setIsOpenRepoCard } = useRepoCard();

  const { data, loading, error } = useQuery(GET_REPOS, {
    variables: { inputValue },
  });

  useEffect(() => {
    changeUserActive(false);
    if (data) {
      const newReposArray = data.search.repos.map((obj: Repos) => obj.repo);
      const { pageNumbers } = calcPagination(newReposArray);

      if (Number(localStorage.getItem('pageNumber')) > pageNumbers.length) {
        localStorage.setItem('pageNumber', '1');
        setActivePage(1);
      }

      setPageNumbers(pageNumbers);
      setRepos(newReposArray);
    }
  }, [data]);

  const handlerLinkClick = (repo: Repo) => {
    setRepoCard(repo);
    setIsOpenRepoCard(true);
  };

  if (loading) {
    return <div className={styles.loader} />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <div className={styles.result}>
      <ul className={styles.result__list}>
        {repos?.length === 0 && inputValue && <h3>Nothing found!</h3>}

        {paginatedRepos.map((repo) => (
          <li className={styles.result__item} key={repo.url}>
            <Link
              to="/repo_card"
              className={styles.result__link}
              onClick={() => handlerLinkClick(repo)}
            >
              <span className={styles.result__text}>Repository: {repo.name}</span>
            </Link>
            <span className={styles.result__text}>Stars: {repo.stargazerCount}</span>
            <span className={styles.result__text}>
              <a href={repo.url} className={styles.result__gitlink}>
                Github link
              </a>
            </span>
            <span className={styles.result__text}>
              {repo.defaultBranchRef
                ? `Last commit: ${formatDate(
                    repo.defaultBranchRef.target.history.edges[0].node.committedDate
                  )}`
                : 'No commits found'}
            </span>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default ResultRepos;
