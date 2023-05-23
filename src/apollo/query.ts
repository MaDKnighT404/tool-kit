import { gql } from '@apollo/client';

const GET_REPOS = gql`
  query ($inputValue: String!) {
    search(type: REPOSITORY, query: $inputValue, first: 10) {
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
    viewer {
      login
      repositories(orderBy: { field: CREATED_AT, direction: ASC }, first: 10) {
        totalCount
        nodes {
          name
          url
        }
      }
    }
  }
`;

export default GET_REPOS;
