import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_REPOS from '../../apollo/query';
import { Repos, Repo } from '../../Types';
import { useUser, useSearch } from '../../zustand/store';
import styles from './Result.module.scss';

interface UserRepos {
  name: string;
  url: string;
}

const Result = () => {
  const { inputValue } = useSearch();
  const { userName, setUserName } = useUser();
  const { data, loading, error } = useQuery(GET_REPOS, {
    variables: { inputValue },
  });

  const [repos, setRepos] = useState<Repo[] | null>([]);
  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    if (data && inputValue) {
      const newReposArray = data.search.repos.map((obj: Repos) => obj.repo);
      setRepos(newReposArray);
    }

    if (data && !inputValue) {
      const userName = data.viewer.login;
      const newReposArray = data.viewer.repositories.nodes.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ __typename, ...rest }: { __typename: string }) => rest
      );
      setUserName(userName);
      setUserRepos(newReposArray);
    }
  }, [data, inputValue, setUserName]);

  if (loading && inputValue) {
    return <div>Loading...</div>;
  }

  if ((error || !data) && inputValue) {
    return <div>ERROR</div>;
  }

  return (
    <div className={styles.result}>
      {!inputValue && !loading && (
        <>
          <h2 className={styles.result__title}>Hello {userName}!</h2>
          <h3 className={styles.result__message}>This is your repositories</h3>
        </>
      )}
      <ul className={styles.result__list}>
        {repos?.length === 0 && inputValue && <h3>Nothing found!</h3>}

        {repos && inputValue
          ? repos.map((repo) => (
              <li className={styles.result__item} key={repo.url}>
                <span className={styles.result__text}>Repository: {repo.name}</span>
                <span className={styles.result__text}>Stars: {repo.stargazerCount}</span>
                <span className={styles.result__text}>
                  <a href={repo.url}>Github link</a>
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
              </li>
            ))
          : userRepos.map((repo: UserRepos) => (
              <li className={styles.result__item} key={repo.url}>
                <span className={styles.result__text}>Repository: {repo.name}</span>
                <span className={styles.result__text}>
                  <a href={repo.url}>Github link</a>
                </span>
                <span className={styles.result__text}></span>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Result;
