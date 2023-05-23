import { FC } from 'react';
import styles from './ResultItem.module.scss';

interface ResultItemsProps {
  name: string;
  stars: string;
  commit: string;
  url: string;
}

const ResultItem: FC<ResultItemsProps> = ({ name, stars, commit, url }) => {
  return (
    <li className={styles.result__item}>
      <span className={styles.result__text}>Repository: {name}</span>
      <span className={styles.result__text}>Stars: {stars}</span>
      <span className={styles.result__text}>
        <a href={url}>Github link</a>
      </span>
      <span className={styles.result__text}>Last commit: {commit}</span>
    </li>
  );
};

export default ResultItem;
