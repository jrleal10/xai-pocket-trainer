// Vercel Edge Function - Gemini WebSocket Proxy
// For Vício Police real-time transcription
// Note: WebSocket proxying requires special handling in Vercel

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Get API key from environment variable
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Return the WebSocket URL with embedded API key
  // This is a server-side endpoint that provides the authenticated WS URL
  return new Response(
    JSON.stringify({
      wsUrl: `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${GEMINI_API_KEY}`
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
