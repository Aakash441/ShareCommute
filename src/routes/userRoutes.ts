import { Router } from "express";
import {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} from "../controllers/userController";

const router = Router();

// Create a new user
router.post('/', createUser);

// Read a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById);

// Delete a user by ID
router.delete('/:id', deleteUserById);

export default router;
