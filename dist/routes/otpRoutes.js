"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const router = (0, express_1.Router)();
router.post("/signup", async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ error: "Phone number required" });
            return;
        }
        const { data, error } = await supabaseConfig_1.default.auth.signInWithOtp({ phone });
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({ success: true, message: "OTP sent to phone" }); // ✅ No explicit return
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/verify-otp', async (req, res) => {
    const { phone, token } = req.body;
    if (!phone || !token) {
        res.status(400).json({ error: 'Phone and token are required' });
        return;
    }
    const { data, error } = await supabaseConfig_1.default.auth.verifyOtp({ phone, token, type: 'sms' });
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
});
router.post('/save-profile', async (req, res) => {
    const { id, first_name, last_name, dob, gender, profile_pic } = req.body;
    if (!id || !first_name || !last_name || !gender) {
        res.status(400).json({ error: 'Field required' });
        return;
    }
    try {
        const { data, error } = await supabaseConfig_1.default
            .from('user_profiles')
            .insert([{ id, first_name, last_name, dob, gender, profile_pic }]);
        if (error)
            throw error;
        res.json({ success: true, message: 'Profile saved successfully', data });
    }
    catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});
exports.default = router;
