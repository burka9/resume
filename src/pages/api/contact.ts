import type { APIRoute } from 'astro';
import { saveContactMessage } from '../../lib/db';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendTelegramMessage(name: string, email: string, message: string): Promise<boolean> {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  const text = `📬 *New Contact Message*

*From:* ${name}
*Email:* ${email}

*Message:*
${message}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const result = await response.json();

      if (result.ok === true) {
        return true;
      }

      console.warn(`Telegram attempt ${attempt}/${MAX_RETRIES} failed:`, result.description);
    } catch (error) {
      console.error(`Telegram attempt ${attempt}/${MAX_RETRIES} error:`, error);
    }

    if (attempt < MAX_RETRIES) {
      await delay(RETRY_DELAY_MS * attempt); // Exponential backoff
    }
  }

  console.error('All Telegram retry attempts failed');
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    await saveContactMessage(name, email, message);

    // Send to Telegram
    const telegramSent = await sendTelegramMessage(name, email, message);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message sent successfully',
        telegram: telegramSent
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
