import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://fika-2022.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
