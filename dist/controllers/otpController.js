"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const twilioConfig_1 = require("../config/twilioConfig");
const sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: "Phone number required" });
            return;
        }
        // Assuming you have a function to send OTP using Twilio
        const otpResponse = await twilioConfig_1.client.verify.services(process.env.TWILIO_SERVICE_SID)
            .verifications
            .create({ to: phone, channel: 'sms' });
        if (otpResponse.status !== 'pending') {
            res.status(500).json({ error: "Failed to send OTP" });
            return;
        }
        res.json({ success: true, message: "OTP sent to phone" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.sendOtp = sendOtp;
const verifyOtp = async (req, res) => {
    const { phone, token } = req.body;
    if (!phone || !token) {
        res.status(400).json({ error: 'Phone and token are required' });
        return;
    }
    try {
        const verificationCheck = await twilioConfig_1.client.verify.services(process.env.TWILIO_SERVICE_SID)
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
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.verifyOtp = verifyOtp;
