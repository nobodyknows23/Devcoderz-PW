// pages/api/player.js or app/api/player/route.js

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        console.log('🔄 Proxying:', targetUrl);

        // Direct fetch with proper headers
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Range': req.headers.range || '',
                'Origin': req.headers.origin || 'https://darzwallah-playerv1.vercel.app',
                'Referer': req.headers.referer || 'https://darzwallah-playerv1.vercel.app/'
            }
        });

        if (!response.ok) {
            console.error('❌ Upstream error:', response.status);
            return res.status(response.status).json({
                error: `Upstream ${response.status}`,
                url: targetUrl
            });
        }

        // Get content type
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        
        // Get the response as buffer
        const buffer = await response.arrayBuffer();

        // Set response headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', response.headers.get('content-length') || buffer.byteLength);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        // Forward CORS headers from upstream
        const corsHeaders = ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'];
        corsHeaders.forEach(header => {
            const value = response.headers.get(header);
            if (value) {
                res.setHeader(header, value);
            }
        });

        // Send the response
        return res.status(response.status).send(Buffer.from(buffer));

    } catch (error) {
        console.error('❌ Proxy error:', error.message);
        return res.status(500).json({
            error: 'Proxy error: ' + error.message,
            url: targetUrl
        });
    }
}
