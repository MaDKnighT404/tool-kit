import { gql } from '@apollo/client';

export const GET_REPOS = gql`
  query repoQueary($inputValue: String!) {
    search(type: REPOSITORY, query: $inputValue, first: 100) {
      repos: edges {
        repo: node {
          ... on Repository {
            name
            url
            stargazerCount
            description
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
            languages(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
            owner {
              login
              url
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
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
  }
`;
