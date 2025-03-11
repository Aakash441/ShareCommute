"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = void 0;
const db_1 = require("../utils/db");
// Create a new user
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, dob, gender, profile_pic } = req.body;
        if (!first_name || !last_name || !gender) {
            res.status(400).json({ error: 'Field required' });
            return;
        }
        const user = await db_1.db.user.create({
            data: {
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : new Date(),
                gender: gender,
                profilePic: profile_pic || '',
            },
        });
        res.json({ success: true, message: 'User created successfully', data: user });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.createUser = createUser;
// Read a user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db_1.db.user.findUnique({
            where: { id },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.getUserById = getUserById;
// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, dob, gender, profile_pic } = req.body;
        const user = await db_1.db.user.update({
            where: { id },
            data: {
                firstName: first_name,
                lastName: last_name,
                dateOfBirth: dob ? new Date(dob).toISOString() : undefined,
                gender: gender ? gender : undefined,
                profilePic: profile_pic,
            },
        });
        res.json({ success: true, message: 'User updated successfully', data: user });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.updateUserById = updateUserById;
// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.db.user.delete({
            where: { id },
        });
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
exports.deleteUserById = deleteUserById;
