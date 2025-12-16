import cron from "node-cron";
import { getIpos } from "../services/ipos.js";
import { sendWhatsAppMessage } from "../services/whatsapp.js";
import { sendTelegramMessage } from "../services/telegram.js";

async function runIpoJob(label: string) {
  try {
    console.log(`[IPO CRON] Running job: ${label}`);

    const message = await getIpos();

    await Promise.all([
      sendWhatsAppMessage(message),
      sendTelegramMessage(message),
    ]);

    console.log(`[IPO CRON] Success: ${label}`);
  } catch (err) {
    console.error(`[IPO CRON] Failed: ${label}`, err);
  }
}

cron.schedule("30 10 * * *", () => runIpoJob("Morning 10:30 IST"), {
  timezone: "Asia/Kolkata",
});

cron.schedule("30 17 * * *", () => runIpoJob("Evening 5:30 IST"), {
  timezone: "Asia/Kolkata",
});
