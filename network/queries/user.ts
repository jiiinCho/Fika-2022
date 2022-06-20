export const GetUserByIdQuery = `
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
