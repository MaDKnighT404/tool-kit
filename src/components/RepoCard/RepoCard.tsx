import { Link } from 'react-router-dom';
import { useRepoCard } from '../../zustand/store';
import styles from './RepoCard.module.scss';

const RepoCard = () => {
  const { repoCard } = useRepoCard();
  localStorage.setItem('repoCard', JSON.stringify(repoCard));
  const avatar = repoCard.defaultBranchRef?.target.author.user?.avatarUrl as string;
  const userName = repoCard.defaultBranchRef?.target.author.user?.login;
  const userUrl = repoCard.defaultBranchRef?.target.author.user?.url as string;
  const repoLanguages = repoCard.languages?.edges.map((item) => item.node.name);
  const lastCommit = repoCard.defaultBranchRef
    ? new Date(
        repoCard.defaultBranchRef.target.history.edges[0].node.committedDate
      ).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null;
      console.log(repoCard)
  return (
    <div className={styles.repoCard}>
      {/* 
      <span>Description: {repoCard.description}</span>
      <span>stars: {repoCard.stargazerCount}</span>
      <span>commit: {lastCommit}</span>

      <ul>
        {repoLanguages?.map((lang) => (
          <li>{lang}</li>
        ))}
      </ul> */}
      <h2 className={styles.repoCard__title}>Repository: {repoCard.name}</h2>
      <Link className={styles.repoCard__link} to={userUrl}>
        <img
          className={styles.repoCard__img}
          src={avatar || '/src/assets/noAvatar.webp'}
          alt="avatar image"
          width={200}
        />
        <span className={styles['repoCard__user-name']}>{userName ? userName : 'noName'}</span>
      </Link>
    </div>
  );
};

export default RepoCard;
