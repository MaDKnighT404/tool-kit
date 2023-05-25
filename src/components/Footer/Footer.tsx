import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer__content">
        <h2 className={styles.footer__title}>
          <a href="https://github.com/MaDKnighT404">Georgii Koloidi</a> || Battleaxe@bk.ru || +7 918
          204 28 88
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
