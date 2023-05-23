import { ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearch } from '../../zustand/store';

import styles from './Search.module.scss';

const SearchInput = () => {
  const { onChange } = useSearch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.search}>
      <label className={styles.search__label}>
        {/* <span className={styles.search__text}> Search: </span> */}
        <BsSearch className={styles.search__icon}></BsSearch>
        <input onChange={handleInputChange} className={styles.search__input} type="text" />
      </label>
    </div>
  );
};

export default SearchInput;
