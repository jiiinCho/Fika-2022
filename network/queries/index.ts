import { gql } from "@apollo/client";

export const getAllPosts = gql`
  query GetAllPosts {
    getAllPosts {
      id
      userId
      username
      locationId
      address
      avatar
      imgUrl
      createdAt
      review
      likes
    }
  }
`;

export const getPostById = gql`
  query GetPostById($id: ID) {
    getPostById(id: $id) {
      id
      userId
      username
      locationId
      address
      avatar
      imgUrl
      createdAt
      review
      likes
    }
  }
`;
