import { gql } from "@apollo/client";

export const GetAllPosts = gql`
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

export const GetPostById = gql`
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

export const GetPostByLocation = gql`
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

export const GetUserById = gql`
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

export const GetLocationByName = `
  query GetLocationByName($business: String) {
    getLocationByName (business: $business){
      id
      business
      street
      city
      country
    }
  }
`;

export const GetLocationByCity = `
  query GetLocationByCity($city: String) {
    getLocationByCity (city: $city) {
      id
      business
      street
      city
      country
    }
  }
`;

export const CreatePost = `
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

export const UpdateLikes = `
mutation UpdateLikes($id: ID, $userId: ID) {
  updateLikes(id: $id, userId: $userId) {
   post {
        id
        likes
      }
   liked
  }
}
`;

export const CreateUser = `
  mutation CreateUser ($user: UserInput){
    createUser(user: $user) {
      user{
        accessToken
        avatar
        id
        username
        likedPosts
      }
      message
    }
  }
`;

export const LoginUser = `
  query Login($user: LoginInput) {
    login(user: $user) {
      user{
        accessToken
        avatar
        id
        username
        likedPosts
      }
      message
    }
  }
`;

export const UpdateUser = `
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

export const DeleteUser = `
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      user {
          id
      }
      message
    }
  }
`;
