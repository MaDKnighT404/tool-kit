import { gql } from '@apollo/client';

const GET_REPOS = gql`
  query {
    viewer {
      login
    }
  }
`;

export default GET_REPOS;
