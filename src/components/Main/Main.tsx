import { Outlet } from 'react-router-dom';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.main}>
      <div className="main__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
