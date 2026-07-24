export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Missing video id"
        });
    }

    try {

        const response = await fetch(
            `https://thestudyspark.site/api-server/v2/videos/get-info?id=${id}`,
            {
                headers: {
                    Referer: "https://thestudyspark.site/",
                    Origin: "https://thestudyspark.site",
                    "User-Agent":
                        "Mozilla/5.0"
                }
            }
        );

        const data = await response.json();

        res.status(200).json(data);

    } catch (e) {

        res.status(500).json({
            success:false,
            error:e.message
        });

    }
}
