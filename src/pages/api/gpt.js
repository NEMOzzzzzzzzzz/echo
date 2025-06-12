// pages/api/gpt.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `text: You are an expert career coach and interviewer. Provide constructive, specific feedback on interview responses in well-formatted markdown with clear headings and bullet points.\n\n${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    const feedback = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!feedback) {
      console.warn("No feedback received from Gemini:", data);
      return res.status(200).json({ choices: [] });
    }

    return res.status(200).json({
      choices: [
        { message: { content: feedback } }
      ]
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
