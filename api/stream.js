export default async function handler(req, res) {
  const { batchId, lectureId, subjectId } = req.query;

  if (!batchId || !lectureId || !subjectId) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const targetUrl = `https://pw.modgalaxy.in/api/get-video?batchId=${batchId}&lectureId=${lectureId}&subjectId=${subjectId}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video data" });
  }
}
