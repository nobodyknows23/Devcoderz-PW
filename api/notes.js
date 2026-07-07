export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { batchId, subjectId, topicId, contentType } = req.query;

    if (!batchId || !subjectId || !topicId || !contentType) {
        return res.status(400).json({ error: "Missing parameters", poweredBy: "The DevCoderZ" });
    }

    try {
        // Yahan $ ka use karke dynamic URL construct ho raha hai
        const rawUrl = `https://api.studyspark.study/api/batch/${batchId}/subject/${subjectId}/contents?page=1&contentType=${contentType}&topicId=${topicId}`;
        
        const targetUrl = `https://pwnewer-2uh.pages.dev/api/pw?url=${encodeURIComponent(rawUrl)}`;
        
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' }
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);

        const data = await response.json();
        return res.status(200).json({ ...data, poweredBy: "The DevCoderZ" });
    } catch (error) {
        return res.status(500).json({ error: "Failed", details: error.message, poweredBy: "The DevCoderZ" });
    }
}
