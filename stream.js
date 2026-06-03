export default async function handler(req, res) {
    // req.url mein query string hota hai (e.g., ?batch_id=123&topic_id=456)
    // Hum sirf usse 'api/stream.js' ka part hata kar bacha hua part use karenge
    const queryString = req.url.split('?')[1]; 
    const targetUrl = `https://eduvibe-pw-api.wasmer.app/get-lectures.php?${queryString}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Proxy Error: " + error.message });
    }
}
