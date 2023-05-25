import { Link } from 'react-router-dom';
import { useRepoCard } from '../../zustand/store';
import styles from './RepoCard.module.scss';

const RepoCard = () => {
  const { isOpen, repoCard } = useRepoCard();
  localStorage.setItem('repoCard', JSON.stringify(repoCard));
  localStorage.setItem('isOpen', JSON.stringify(isOpen));

  const avatar = repoCard.owner.avatarUrl || '/src/assets/noAvatar.webp';
  const userName = repoCard.owner.login;
  const userUrl = repoCard.owner.url;
  const repourl = repoCard.url;
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
        <Link className={styles.card__link} to={repourl}>
          Repository: {repoCard.name}{' '}
        </Link>
        <span className={styles.card__stars}>{repoCard.stargazerCount}</span>
      </h2>

      <div className={styles.profile}>
        <Link className={styles.profile__link} to={userUrl}>
          <img className={styles.profile__img} src={avatar} alt="avatar image" />
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
          {repoLanguages?.length === 0 ? (
            <li className={styles.language__item}>No languages found</li>
          ) : null}
          {repoLanguages?.map((lang) => (
            <li className={styles.language__item} key={lang}>
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepoCard;
