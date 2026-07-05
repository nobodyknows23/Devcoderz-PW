export default async function handler(req, res) {
  const { batchId } = req.query;
  const targetUrl = `https://brainboxinstitute.in/api/todays-schedule?batchId=${batchId}`;
  
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
}
