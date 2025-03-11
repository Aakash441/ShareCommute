// src/controllers/otpController.ts
import { Request, Response } from 'express';
import { client } from '../config/twilioConfig';

export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: "Phone number required" });
            return;
        }

        // Assuming you have a function to send OTP using Twilio
        const otpResponse = await client.verify.services(process.env.TWILIO_SERVICE_SID as string)
            .verifications
            .create({ to: phone, channel: 'sms' });

        if (otpResponse.status !== 'pending') {
            res.status(500).json({ error: "Failed to send OTP" });
            return;
        }

        res.json({ success: true, message: "OTP sent to phone" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }};

export const verifyOtp = async (req: Request, res: Response) => {
    const { phone, token }: { phone: string; token: string } = req.body;

    if (!phone || !token) {
        res.status(400).json({ error: 'Phone and token are required' });
        return;
    }

    try {
        const verificationCheck = await client.verify.services(process.env.TWILIO_SERVICE_SID as string)
            .verificationChecks
            .create({ to: phone, code: token });

        if (verificationCheck.status !== 'approved') {
            res.status(400).json({ error: 'Verification failed' });
            return;
        }

        res.json({
            success: true,
            message: 'OTP verified successfully',
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};