export interface Repos {
  repo: Repo;
}

export interface Repo {
  name: string;
  stargazerCount?: string;
  description?: string;
  url: string;
  languages?: {
    edges: LangEdges[];
  };
  defaultBranchRef?: {
    target: {
      history: {
        edges: CommitEdges[];
      };
      author: {
        user: {
          url: string;
          avatarUrl: string;
          login: string;
        };
      };
    };
  };
}

interface CommitEdges {
  node: {
    committedDate: string;
  };
}

interface LangEdges {
  node: {
    name: string;
  };
}
