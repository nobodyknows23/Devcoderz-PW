export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { batchId, subjectId, topicId, contentType, page, tag } = req.query;

    if (!batchId || !subjectId) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const targetUrl = `https://thestudyspark.site/api-server/v2/batches/${batchId}/subject/${subjectId}/content?page=${page || 1}&contentType=${contentType}&tag=${tag || ''}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                "Referer": "https://pw.live/",
                "Accept": "application/json"
            }
        });

        if (response.status === 429) {
            return res.status(429).json({ error: "Rate limit exceeded" });
        }

        if (!response.ok) {
            return res.status(response.status).json({ error: `External API responded with status ${response.status}` });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (e) {
        return res.status(500).json({ error: "Internal Server Error", details: e.message });
    }
}
