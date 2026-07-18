export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

   
    const { batchId, subjectId, topicId, contentType, page } = req.query;

  
    if (!batchId || !subjectId) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    
    const targetUrl = `https://pw.modgalaxy.in/api/token-free?type=contents&batchId=${batchId}&subjectId=${subjectId}&topicSlug=${topicId || ''}&contentType=${contentType || 'videos'}&page=${page || 1}`;

    try {
        const response = await fetch(targetUrl, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

       
        if (!response.ok) {
            throw new Error(`External API responded with status ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (e) {
        console.error("Fetch Error:", e); 
        return res.status(500).json({ error: "Internal Server Error", details: e.message });
    }
}
