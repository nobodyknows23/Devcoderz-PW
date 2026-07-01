export default async function handler(req, res) {
    const { batchId, subjectId, tag, page } = req.query;

    // Check karein ki kya zaroori IDs mil rahi hain
    if (!batchId || !subjectId) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const targetUrl = `https://thestudyspark.site/api-server/v2/batches/${batchId}/subject/${subjectId}/content?page=${page || 1}&contentType=videos&tag=${tag || ''}`;

    try {
        const response = await fetch(targetUrl);
        
        // Agar status 200 nahi hai, toh error throw karein
        if (!response.ok) {
            throw new Error(`External API returned status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        // Log error ko Vercel logs mein dekhne ke liye
        console.error("Fetch Error:", e);
        res.status(500).json({ error: "Proxy Failed", details: e.message });
    }
}
