import { BsSearch } from 'react-icons/bs';

import styles from './Search.module.scss';

const SearchInput = () => {
  return (
    <div className={styles.search}>
      <label className={styles.search__label}>
        {/* <span className={styles.search__text}> Search: </span> */}
        <BsSearch className={styles.search__icon}></BsSearch>
        <input className={styles.search__input} type="text" />
      </label>
    </div>
  );
};

export default SearchInput;
