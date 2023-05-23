import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="header__content">
        <h1 className={styles.header__title}>Repo Finder</h1>
      </div>
    </div>
  );
};

export default Header;
