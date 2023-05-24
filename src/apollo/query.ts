import { gql } from '@apollo/client';

const GET_REPOS = gql`
query repoQueary($inputValue: String!) {
  viewer {
    login
    id
    repositories(orderBy: {field: CREATED_AT, direction: ASC}, first: 100) {
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
                author {
                  user {
                    url
                    avatarUrl
                    name
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
        }
      }
    }
  }
}
`;

export default GET_REPOS;
