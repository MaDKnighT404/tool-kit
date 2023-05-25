import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { useRepoCard } from '../../zustand/store';

const Header = () => {
  const { isOpen, toogleIsOpenRepoCard } = useRepoCard();

  const handlerToggleIsOpenRepoCard = () => {
    toogleIsOpenRepoCard();
  };

  return (
    <div className={styles.header}>
      <div className="header__content">
        <div className={styles.header__wrapper}>
          <h1 className={styles.header__title}>Repo Finder</h1>
          {!isOpen && (
            <Link to="/" className={styles.header__link}>
              <button className={styles.header__btn} onClick={handlerToggleIsOpenRepoCard}>
                Back to Main
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
