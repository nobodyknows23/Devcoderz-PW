export default async function handler(req, res) {
    // 1. CORS Headers set karein
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Preflight request (OPTIONS) ko handle karein
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { batchId, subjectId, tag, contentType, page } = req.query;

    const targetUrl = `https://thestudyspark.site/api-server/v2/batches/${batchId}/subject/${subjectId}/content?page=${page || 1}&contentType=${contentType}&tag=${tag || ''}`;

    try {
        const response = await fetch(targetUrl, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });
        const data = await response.json();
        
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
