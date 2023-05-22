import { Outlet } from 'react-router-dom';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  );
};

export default Main;
