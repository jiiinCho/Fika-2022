import { ApiConfig, Variables } from "@network/common/types/api";
import { PostT } from "@interface/index";
import { GetPostByIdQuery } from "@network/queries/post";

type ReturnType = {
  getPostById: PostT;
};

export default async function getPostById(options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<PostT> {
  if (!process.env.BACKEND_URL) {
    throw new Error("cannot get process.env.BACKEND_UR");
  }

  const { config, variables } = options;
  const { data } = await config.fetch<ReturnType>({
    API_URL: process.env.BACKEND_URL,
    query: GetPostByIdQuery,
    variables,
  });
  return data.getPostById;
}
