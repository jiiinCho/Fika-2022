export type ApiFetcherOptions = {
  API_URL: string;
  query: string;
  variables?: Variables;
};

export type Variables = { [key: string]: string | string[] };
export type ApiFetcherResults<T> = {
  [key: string]: T;
};
export interface ApiConfig {
  fetch<T>(options: ApiFetcherOptions): Promise<ApiFetcherResults<T>>;
}
