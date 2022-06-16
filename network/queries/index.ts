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

export const getUserById = gql`
  query GetUserById($id: ID) {
    getUserById(id: $id) {
      id
      username
      email
      avatar
      likedPosts
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
        accessToken
        avatar
        id
        username
      }
      message
    }
  }
`;

export const loginUser = `
  query Login($user: LoginInput) {
    login(user: $user) {
      user{
        accessToken
        avatar
        id
        username
      }
      message
    }
  }
`;

export const updateUser = `
  mutation UpdateUser($id: ID, $user: UserInput) {
    updateUser(id: $id, user: $user) {
      user {
          id
      username
      email
      password
      avatar
      }
      message
    }
  }
`;

export const deleteUser = `
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      user {
          id
      }
      message
    }
  }
`;
