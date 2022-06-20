import { ApiConfig, Variables } from "@network/common/types/api";
import { PostT } from "@interface/index";
import { GetPostByLocationQuery } from "@network/queries/post";

type ReturnType = {
  getPostByLocation: PostT[];
};

export default async function getPostByLocation(options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<PostT[]> {
  if (!process.env.BACKEND_URL) {
    throw new Error("cannot get process.env.BACKEND_UR");
  }

  const { config, variables } = options;
  const { data } = await config.fetch<ReturnType>({
    API_URL: process.env.BACKEND_URL,
    query: GetPostByLocationQuery,
    variables,
  });
  return data.getPostByLocation;
}
