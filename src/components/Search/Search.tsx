import { ChangeEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRepoCard, useSearch } from '../../zustand/store';

import styles from './Search.module.scss';

const SearchInput = () => {
  const { onChange } = useSearch();
  const { setIsOpenRepoCard } = useRepoCard();
  
  const value = localStorage.getItem('inputValue') || '';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('inputValue', e.target.value);
    onChange(e.target.value);
    if (!value) {
      setIsOpenRepoCard(false);
    }
  };

  return (
    <div className={styles.search}>
      <label className={styles.search__label}>
        {/* <span className={styles.search__text}> Search: </span> */}
        <BsSearch className={styles.search__icon}></BsSearch>
        <input
          onChange={handleInputChange}
          className={styles.search__input}
          type="text"
          value={value}
        />
      </label>
    </div>
  );
};

export default SearchInput;
