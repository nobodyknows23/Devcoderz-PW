export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: "ID missing" });

  const url = `https://thestudyspark.site/api-server/v2/videos/get-info?id=${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Referer': 'https://thestudyspark.site/',
        'Origin': 'https://thestudyspark.site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    const data = await response.json();
    
    // Agar key ya decryption data aa raha hai to yahan print hoga
    console.log("API Response:", JSON.stringify(data, null, 2));

    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: "Proxy failed", 
      error: err.message 
    });
  }
}