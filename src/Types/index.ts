export interface Repos {
  repo: Repo;
  __typename: string;
}

export interface Repo {
  name: string;
  stargazerCount?: string;
  url: string;
  __typename?: string;
  defaultBranchRef?: {
    target: {
      history: {
        edges: Edges[];
        __typename: string;
      };
      __typename: string;
    };
    __typename: string;
  };
}

interface Edges {
  node: {
    committedDate: string;
    __typename: string;
  };
  __typename: string;
}
