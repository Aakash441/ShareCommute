import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

if (!accountSid || !authToken) {
    throw new Error("Twilio Account SID and Auth Token must be defined in environment variables");
}

const client = twilio(accountSid, authToken);

export { client };
