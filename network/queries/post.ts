export const GetAllPostsQuery = `
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
