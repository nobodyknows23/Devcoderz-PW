export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: "ID parameter missing" 
    });
  }

  const targetUrl = `https://thestudyspark.site/api-server/v2/videos/get-info?id=${lectureId}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://thestudyspark.site/',
        'Origin': 'https://thestudyspark.site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Proxy failed",
      error: error.message
    });
  }
}