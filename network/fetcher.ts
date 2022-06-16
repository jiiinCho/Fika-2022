export default async function fetcher(
  url: string,
  body: any,
  accessToken?: string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  accessToken && myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return await res.json();
}
