import styles from './RepoCard.module.scss';
import { useRepoCard } from '../../zustand/store';

const RepoCard = () => {
  const { repoCard } = useRepoCard();
  const avatar = repoCard.defaultBranchRef?.target.author.user.avatarUrl;
  const userName = repoCard.defaultBranchRef?.target.author.user.name;
  const userUrl = repoCard.defaultBranchRef?.target.author.user.url;
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
    <div className={styles.repoCard}>
      <span>Repository: {repoCard.name}</span>
      <span>Description: {repoCard.description}</span>
      <span>stars: {repoCard.stargazerCount}</span>
      <span>commit: {lastCommit}</span>
      <img src={avatar || ''} alt="" width={200} />
      <span>userName: {userName}</span>
      <span>userUrl: {userUrl}</span>
      <ul>
        {repoLanguages?.map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepoCard;
