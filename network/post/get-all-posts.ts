import { ApiConfig } from "@network/common/types/api";
import { PostT } from "@interface/index";
import { GetAllPostsQuery } from "@network/queries/post";

type ReturnType = {
  getAllPosts: PostT[];
};

export default async function getAllPosts(config: ApiConfig): Promise<PostT[]> {
  if (!process.env.BACKEND_URL) {
    throw new Error("cannot get process.env.BACKEND_UR");
  }
  const { data } = await config.fetch<ReturnType>({
    API_URL: process.env.BACKEND_URL,
    query: GetAllPostsQuery,
  });
  return data.getAllPosts;
}
