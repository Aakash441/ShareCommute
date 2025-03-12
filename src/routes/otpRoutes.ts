import { Router, Request, Response } from "express";
import { client } from "../config/twilioConfig";
import { db } from "../utils/db";
import { Gender } from "@prisma/client";
import { sendOtp, verifyOtp } from "../controllers/otpController";

const router = Router();

router.post("/", sendOtp)
router.post('/verify', verifyOtp)

export default router;
