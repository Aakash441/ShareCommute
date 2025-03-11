"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Create a new user
router.post('/', userController_1.createUser);
// Read a user by ID
router.get('/:id', userController_1.getUserById);
// Update a user by ID
router.put('/:id', userController_1.updateUserById);
// Delete a user by ID
router.delete('/:id', userController_1.deleteUserById);
exports.default = router;
