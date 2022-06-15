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
