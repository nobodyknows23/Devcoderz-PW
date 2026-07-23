export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const scrapeDoToken = '11c63f21b40043bbbe24ee1c179b1b3ede58155df6a';
        const scrapeUrl = `https://api.scrape.do?token=${scrapeDoToken}&url=${encodeURIComponent(targetUrl)}`;

        const response = await fetch(scrapeUrl);

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const buffer = await response.arrayBuffer();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', contentType);
        return res.status(response.status).send(Buffer.from(buffer));

    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(500).json({ error: err.message });
    }
}
