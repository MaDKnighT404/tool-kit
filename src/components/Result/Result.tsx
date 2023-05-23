import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_REPOS from '../../apollo/query';
import { Repos, Repo } from '../../Types';
import styles from './Result.module.scss';
import ResultItem from '../ResultItem';

const Result = () => {
  const { data, loading, error } = useQuery(GET_REPOS);
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    if (data) {
      const reposArray = data.search.repos.map((obj: Repos) => obj.repo);
      setRepos(reposArray);
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
      <ul className={styles.result__list}>
        {repos &&
          repos.map((repo) => (
            <ResultItem
              key={repo.url}
              name={repo.name}
              url={repo.url}
              commit={repo.defaultBranchRef.target.history.edges[0].node.committedDate}
              stars={repo.stargazerCount}
            />
          ))}
      </ul>
    </div>
  );
};

export default Result;
