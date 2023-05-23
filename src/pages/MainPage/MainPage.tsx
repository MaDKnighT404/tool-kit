import { useQuery } from '@apollo/client';
import Search from '../../components/Search';
import GET_REPOS from '../../apollo/query';

const MainPage = () => {
  const { data } = useQuery(GET_REPOS);
  console.log(data);
  return (
    <>
      <Search />
    </>
  );
};

export default MainPage;
