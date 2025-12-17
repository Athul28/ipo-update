import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.FROM_PHONE || "";

const client = twilio(accountSid, authToken);

export async function sendWhatsAppMessage(message: string) {
  try {
    const recipients = process.env.WHATSAPP_RECIPIENTS;

    if (!recipients) {
      throw new Error("WHATSAPP_RECIPIENTS NOT SET");
    }
    const numbers = recipients.split(",").map((n) => n.trim());

    await Promise.all(
      numbers.map((to) => {
        client.messages.create({
          from: fromPhone,
          to: `whatsapp:${to}`,
          body: message,
        });
      })
    );
    return JSON.stringify({ message: "Message sent" });
  } catch (err) {
    console.error("Failed to send Whatsapp Message: " + err);
    return JSON.stringify({ message: "Failed to send Whatsapp Message" });
  }
}
