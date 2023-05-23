import { FC } from 'react';
import styles from './ResultItem.module.scss';

interface ResultItemsProps {
  name: string;
  stars: string;
  commit: string;
  url: string;
}

const ResultItem: FC<ResultItemsProps> = ({ name, stars, commit, url }) => {
  return <div>{name} {stars} {commit} {url}</div>;
};

export default ResultItem;
