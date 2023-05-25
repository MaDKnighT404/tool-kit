import { Outlet } from 'react-router-dom';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles.main}>
      <div className="main__content">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
