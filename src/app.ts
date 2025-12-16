import express from "express";
import type { Request, Response } from "express";
import { sendWhatsAppMessage } from "./services/whatsapp.js";
import { getIpos } from "./services/ipos.js";
import { sendTelegramMessage } from "./services/telegram.js";
import "./cron/ipoCron.js";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

app.get("/ipo-updates", async (req: Request, res: Response) => {
  const message = await getIpos();
  await sendWhatsAppMessage(message);
  await sendTelegramMessage(message);
  res.json({ success: true });
});

const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log(`Server running in port = ${PORT}`);
});
