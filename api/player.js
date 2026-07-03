export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { batchId, lectureId } = req.query;

    if (!batchId || !lectureId) {
        return res.status(400).json({ 
            error: "Missing required parameters: batchId and lectureId are required.",
            poweredBy: "The DevCoderZ"
        });
    }

    try {
        const targetUrl = `https://ayush-mirror.vercel.app/api/get-video-url?batchId=${encodeURIComponent(batchId)}&childId=${encodeURIComponent(lectureId)}`;

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'Referer': 'https://www.google.com/'
            }
        });

        if (!response.ok) {
            throw new Error(`Upstream API responded with status ${response.status}`);
        }

        const data = await response.json();

        return res.status(200).json({
            ...data,
            poweredBy: "The DevCoderZ"
        });

    } catch (error) {
        return res.status(500).json({ 
            error: "Failed to fetch data.", 
            details: error.message,
            poweredBy: "The DevCoderZ"
        });
    }
}
