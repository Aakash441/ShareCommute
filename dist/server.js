"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/otp', otpRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
