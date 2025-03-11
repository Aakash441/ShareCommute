import { Request, Response } from "express";
import { db } from "../utils/db";
import { Gender } from "@prisma/client";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, dob, gender, profile_pic }: {
            first_name: string;
            last_name: string;
            dob?: string;
            gender: string;
            profile_pic?: string;
        } = req.body;

        if (!first_name || !last_name || !gender) {
            res.status(400).json({ error: 'Field required' });
            return;
        }

        const user = await db.user.create({
            data: {
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : new Date(),
                gender: gender as Gender,
                profilePic: profile_pic || '',
            },
        });

        res.json({ success: true, message: 'User created successfully', data: user });
    } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

// Read a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await db.user.findUnique({
            where: { id },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ success: true, data: user });
    } catch (error: any) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, dob, gender, profile_pic }: {
            first_name?: string;
            last_name?: string;
            dob?: string;
            gender?: string;
            profile_pic?: string;
        } = req.body;

        const user = await db.user.update({
            where: { id },
            data: {
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : undefined,
                gender: gender ? gender as Gender : undefined,
                profilePic: profile_pic,
            },
        });

        res.json({ success: true, message: 'User updated successfully', data: user });
    } catch (error: any) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await db.user.delete({
            where: { id },
        });

        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
