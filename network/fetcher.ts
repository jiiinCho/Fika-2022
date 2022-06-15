export default async function fetcher(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return await res.json();
}
