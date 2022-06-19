import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: true,
  uri: "https://fika-2022.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
