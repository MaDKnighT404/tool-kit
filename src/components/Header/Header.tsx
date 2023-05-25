import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { useRepoCard } from '../../zustand/store';

const Header = () => {
  const { isOpen, setIsOpenRepoCard } = useRepoCard();

  const handlerSetIsOpenRepoCard = () => {
    setIsOpenRepoCard(false);
    localStorage.setItem('isOpen', JSON.stringify(false));

  };

  return (
    <header className={styles.header}>
      <div className="header__content">
        <div className={styles.header__wrapper}>
          <h1 className={styles.header__title}>Repo Finder</h1>
          {Boolean(isOpen) && (
            <Link to="/" className={styles.header__link}>
              <button className={styles.header__btn} onClick={handlerSetIsOpenRepoCard}>
                Back to Main
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
