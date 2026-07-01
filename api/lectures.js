// Server-side code snippet
app.get('/api/proxy', async (req, res) => {
    // Query parameters se IDs extract karein
    const batchId = req.query.batchId;
    const subjectId = req.query.subjectId;
    const tag = req.query.tag;
    const page = req.query.page || 1;

    // Ab apni API URL ko query params se rebuild karein
    const targetUrl = `https://thestudyspark.site/api-server/v2/batches/${batchId}/subject/${subjectId}/content?page=${page}&contentType=videos&tag=${tag}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Proxy Error");
    }
});
