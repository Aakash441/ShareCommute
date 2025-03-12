// src/controllers/otpController.ts
import { Request, Response } from 'express';
import { client } from '../config/twilioConfig';
import supabase from "../config/supabaseConfig";
export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: "Phone number required" });
            return;
        }

        const { data, error } = await supabase.auth.signInWithOtp({ phone });

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json({ success: true, message: "OTP sent to phone" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { phone, token }: { phone: string; token: string } = req.body;

    if (!phone || !token) {
        res.status(400).json({ error: 'Phone and token are required' });
        return;
    }

    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });

    if (error || !data.user || !data.session) {
        res.status(400).json({ error: error?.message || 'Verification failed' });
        return;
    }

    res.json({
        success: true,
        userId: data.user.id,
        access_token: data.session.access_token,
        token_type: 'Bearer',
        expires_in: data.session.expires_in || 3600,
        message: 'OTP verified successfully',
    });
};