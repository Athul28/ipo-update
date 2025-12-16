import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials missing");
  }

  await axios.post(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
  });
}
