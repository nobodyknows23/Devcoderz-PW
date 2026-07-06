export default async function handler(req, res) {
    const { batchId, subjectId, contentType, topicId } = req.query;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!batchId || !subjectId || !contentType || !topicId) {
        return res.status(400).json({ 
            error: "Required parameters missing." 
        });
    }

    try {
        const targetUrl = `https://api.studyspark.study/api/batch/${batchId}/subject/${subjectId}/contents?page=1&contentType=${contentType}&topicId=${topicId}`;

        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) throw new Error("Wasmer cluster chapters response failed");

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch data securely from core network." });
    }
}
