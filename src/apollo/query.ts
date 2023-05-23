import { gql } from '@apollo/client';

const inputValue = 'MadKnight';

const GET_REPOS = gql`
  query {
    search(
      type: REPOSITORY
      query: """
      ${inputValue} in:name
      """
      first: 10
    ) {
      repos: edges {
        repo: node {
          ... on Repository {
            name
            url
            stargazerCount
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 1) {
                    edges {
                      node {
                        ... on Commit {
                          committedDate
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_REPOS;
