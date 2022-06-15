export default async function fetcher(url: string, body: any) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return await res.json();
}
