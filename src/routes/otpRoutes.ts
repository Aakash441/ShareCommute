import { Router, Request, Response } from "express";
import { client } from "../config/twilioConfig";
import supabase from "../config/supabaseConfig";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
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

        res.json({ success: true, message: "OTP sent to phone" }); // ✅ No explicit return
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/verify-otp', async (req: Request, res: Response) => {
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
});

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
        const { data, error } = await supabase
            .from('user_profiles')
            .insert([{ id, first_name, last_name, dob, gender, profile_pic }]);

        if (error) throw error;

        res.json({ success: true, message: 'Profile saved successfully', data });
    } catch (error: any) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

export default router;
