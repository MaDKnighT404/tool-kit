import { gql } from '@apollo/client';

const GET_REPOS = gql`
  query repoQueary($inputValue: String!) {
    viewer {
      login
      id
      repositories(orderBy: { field: CREATED_AT, direction: ASC }, first: 100) {
        totalCount
        nodes {
          name
          url
        }
      }
    }
    search(type: REPOSITORY, query: $inputValue, first: 100) {
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
