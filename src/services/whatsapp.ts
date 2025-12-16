import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.FROM_PHONE || "";
const toPhone = process.env.TO_PHONE || "";

const client = twilio(accountSid, authToken);

export async function sendWhatsAppMessage(message: string) {
  return client.messages.create({
    from: fromPhone,
    to: toPhone,
    body: message,
  });
}
