export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        const decodedUrl = decodeURIComponent(url);
        const response = await fetch(decodedUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.studyspark.study/",
                "Origin": "https://www.studyspark.study/"
            }
        });

        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch content" });
    }
}
