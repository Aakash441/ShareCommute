import { Router, Request, Response } from "express";
import { client } from "../config/twilioConfig";
import { db } from "../utils/db";
import { Gender } from "@prisma/client";
import { sendOtp, verifyOtp } from "../controllers/otpController";

const router = Router();

router.post("/", sendOtp)
router.post('/verify', verifyOtp)

router.post('/save-profile', async (req: Request, res: Response) => {
    const { id, first_name, last_name, dob, gender, profile_pic }: {
        id: string;
        first_name: string;
        last_name: string;
        dob?: string;
        gender: string;
        profile_pic?: string;
    } = req.body;

    if (!id || !first_name || !last_name || !gender) {
        res.status(400).json({ error: 'Field required' });
        return;
    }

    try {
        const user = await db.user.create({
            data: {
                id,
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : new Date(),
                gender: gender as Gender,
                profilePic: profile_pic || '',
            },
        });

        res.json({ success: true, message: 'Profile saved successfully', data: user });
    } catch (error: any) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

export default router;
