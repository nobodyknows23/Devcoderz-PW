export default async function handler(req, res) {
  const { url } = req.query;
  const token = req.headers['x-pw-token'];

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch(url, {
      headers: {
        "authorization": token ? `Bearer ${token}` : "",
        "User-Agent": "Dalvik/2.1.0",
        "client-id": "ADMIN"
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy Failed" });
  }
}
