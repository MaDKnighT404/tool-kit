import Search from '../../components/Search';
import ResultRepos from '../../components/ResultRepos';
import ResultUser from '../../components/ResultUser';
import { useSearch } from '../../zustand/store';

const MainPage = () => {
  const { inputValue } = useSearch();
  return (
    <>
      <Search />
      {inputValue ? <ResultRepos /> : <ResultUser />}
    </>
  );
};

export default MainPage;
