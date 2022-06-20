import { ApiConfig, Variables } from "@network/common/types/api";
import { PostT, UserInfoT } from "@interface/index";
import { GetUserByIdQuery } from "@network/queries/user";

type ReturnType = {
  getUserById: UserInfoT | null;
};

export default async function getUserById(options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<UserInfoT | null> {
  if (!process.env.BACKEND_URL) {
    throw new Error("cannot get process.env.BACKEND_UR");
  }

  const { config, variables } = options;
  const { data } = await config.fetch<ReturnType>({
    API_URL: process.env.BACKEND_URL,
    query: GetUserByIdQuery,
    variables,
  });
  return data.getUserById;
}
