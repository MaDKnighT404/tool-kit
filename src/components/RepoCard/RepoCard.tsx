import { HiOutlineStar } from 'react-icons/hi';

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

  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>
        Repository: {repoCard.name}{' '}
        <span className={styles.card__stars}>{repoCard.stargazerCount}</span>
      </h2>

      <div className={styles.profile}>
        <Link className={styles.profile__link} to={userUrl}>
          <img
            className={styles.profile__img}
            src={avatar || '/src/assets/noAvatar.webp'}
            alt="avatar image"
          />
          <span className={styles.profile__name}>{userName ? userName : 'noName'}</span>
        </Link>
      </div>

      <div className={styles.description}>
        <h2 className={styles.description__title}>Description:</h2>
        <p className={styles.description__text}>{repoCard.description || 'No descrition found'}</p>
        <span className={styles.description__commit}>Last commit: {lastCommit}</span>
      </div>

      <div className={styles.language}>
        <h2 className={styles.language__title}>Main languages:</h2>
        <ul className={styles.language__list}>
          {repoLanguages?.map((lang) => (
            <li className={styles.language__item}>{lang}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepoCard;
