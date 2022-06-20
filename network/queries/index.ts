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
