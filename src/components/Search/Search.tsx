import { ChangeEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useRepoCard, useSearch } from '../../zustand/store';

import styles from './Search.module.scss';

const SearchInput = () => {
  const { onChange } = useSearch();
  const { setIsOpenRepoCard } = useRepoCard();

  const value = localStorage.getItem('inputValue') || '';
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }

    const inputValue = e.target.value;
    localStorage.setItem('inputValue', inputValue);

    const newTimer = setTimeout(() => {
      onChange(inputValue);
      if (!inputValue) {
        setIsOpenRepoCard(false);
      }
    }, 500);

    setTimer(newTimer);
  };

  return (
    <div className={styles.search}>
      <label className={styles.search__label}>
        <BsSearch className={styles.search__icon} />
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
