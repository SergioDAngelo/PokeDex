// import axios from 'axios'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const pokeInfo = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});
