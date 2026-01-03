// Vercel Edge Function - Gemini REST API Proxy
// For transcription and analysis (Rehearsal Mode)

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get API key from environment variable
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const body = await request.json();

    // Forward request to Gemini 2.5 Flash API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return new Response(JSON.stringify({ error: errorText }), {
        status: geminiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return Gemini's response
    const data = await geminiResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
