import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer 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`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
