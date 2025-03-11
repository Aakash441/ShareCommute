"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const otpController_1 = require("../controllers/otpController");
const router = (0, express_1.Router)();
router.post("/", otpController_1.sendOtp);
router.post('/verify', otpController_1.verifyOtp);
router.post('/save-profile', async (req, res) => {
    const { id, first_name, last_name, dob, gender, profile_pic } = req.body;
    if (!id || !first_name || !last_name || !gender) {
        res.status(400).json({ error: 'Field required' });
        return;
    }
    try {
        const user = await db_1.db.user.create({
            data: {
                id,
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : new Date(),
                gender: gender,
                profilePic: profile_pic || '',
            },
        });
        res.json({ success: true, message: 'Profile saved successfully', data: user });
    }
    catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});
exports.default = router;
