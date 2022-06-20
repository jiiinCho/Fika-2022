import { ApiConfig } from "@network/common/types/api";
import fetchApi from "@network/utils/fetch-api";

class Config {
  private config: ApiConfig;
  constructor(config: ApiConfig) {
    this.config = config;
  }

  getConfig(): ApiConfig {
    return this.config;
  }
}

const configWrapper = new Config({ fetch: fetchApi });
export function getConfig() {
  return configWrapper.getConfig();
}
