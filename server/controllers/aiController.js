const asyncHandler = require('express-async-handler');

const SYSTEM_PROMPT = `You are TravelBot, the official AI trip planning assistant for ExplorePK — Pakistan's premier tourism and events portal. You are knowledgeable, friendly, and enthusiastic about Pakistan's beauty and culture.

Your expertise covers:
- Tourist attractions across Pakistan: Lahore Fort, Badshahi Mosque, Mohenjo-daro, Hunza Valley, Saif ul Malook Lake, Faisal Mosque, Shalimar Gardens, Deosai Plains, Fairy Meadows, Rohtas Fort, and hundreds more
- Pakistani cities for tourism: Lahore, Islamabad, Karachi, Peshawar, Quetta, Gilgit, Skardu, Murree, Swat, Naran, Chitral
- Cultural events, festivals, and local experiences: Shandur Polo Festival, Lahore Literary Festival, Basant, Urs festivals, food festivals
- Travel tips: best seasons to visit, local transport options, cultural etiquette, safety tips, visa info for international tourists
- Trip planning: creating day-by-day itineraries, suggesting routes between cities, estimating travel times

When answering:
- Always be specific to Pakistan — never suggest non-Pakistani destinations
- Format itineraries clearly with Day 1, Day 2 structure
- Mention realistic travel times between cities
- Suggest users explore the ExplorePK platform for booking events and discovering more attractions
- Keep responses concise but informative (max 3-4 paragraphs or a structured list)
- Be warm and encouraging about Pakistan's safety and beauty for tourists
- If asked about hostels or accommodation, mention that attraction detail pages on ExplorePK have nearby hotel recommendations

You cannot: book tickets, process payments, or access real-time data. Always be honest about these limitations.`;

const chatWithAI = asyncHandler(async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    res.status(400);
    throw new Error('Message is required');
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in .env');
    res.status(500);
    throw new Error('AI service is not configured');
  }

  const conversationPayload = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood! I am TravelBot, ready to help plan amazing trips across Pakistan.' }] },
    ...conversationHistory.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: conversationPayload })
    }
  );

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    console.error('Gemini API error:', errText);
    res.status(502);
    throw new Error('Failed to get response from AI service');
  }

  const geminiData = await geminiRes.json();
  const aiText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    res.status(502);
    throw new Error('Empty response from AI service');
  }

  res.json({ reply: aiText });
});

module.exports = { chatWithAI };
