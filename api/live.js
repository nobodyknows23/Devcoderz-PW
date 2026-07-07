export default async function handler(req, res) {
  const targetUrl = 'https://learnbyakp.onrender.com/api/penpencil/v1/batches/${batchId}/todays-schedule';

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Agar API ko specific headers ki zaroorat ho to wo yahan add karein
      },
    });

    const data = await response.json();

    // CORS headers add karna taaki aap ise frontend se access kar sakein
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the schedule' });
  }
}
