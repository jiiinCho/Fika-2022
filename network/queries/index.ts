import { gql } from "@apollo/client";

export const getAllPosts = gql`
  query GetAllPost {
    getAllPosts {
      id
      user {
        id
        username
        avatar
      }
      imgUrl
    }
  }
`;

export const getPostById = gql`
  query GetPostById($id: ID) {
    getPostById(id: $id) {
      id
      user {
        id
        username
        avatar
      }
      location {
        id
        business
        street
        city
        country
      }
      imgUrl
      createdAt
      review
      likes
      rating
    }
  }
`;

export const getPostByLocation = gql`
  query GetPostByLocation($locationId: ID) {
    getPostByLocation(locationId: $locationId) {
      id
      user {
        id
        username
        avatar
      }
      location {
        id
        business
        street
        city
        country
      }
      imgUrl
      createdAt
      review
      likes
      rating
    }
  }
`;

export const searchLocation = `
  query SearchLocation($business: String) {
    searchLocation(business: $business) {
      id
      business
      street
      city
      country
    }
  }
`;

export const createPost = `
  mutation CreatePost($post: PostInput) {
    createPost(post: $post) {
      id
      user {
        id
        username
        avatar
      }
      location {
        id
        business
        street
        city
        country
      }
      imgUrl
      review
      createdAt
      likes
    }
  }
`;

export const updateLikes = `
  mutation UpdateLikes($id: ID) {
    updateLikes(id: $id) {
      id
      likes
    }
  }
`;

export const createUser = `
  mutation CreateUser ($user: UserInput){
    createUser(user: $user) {
      user{
        id
        accessToken
      }
      message
    }
  }
`;

export const loginUser = `
  query Login($user: LoginInput) {
    login(user: $user) {
      user{
        id
        accessToken
      }
      message
    }
  }
`;
