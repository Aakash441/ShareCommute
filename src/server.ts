import express, { Application, Request, Response } from 'express';
import otpRoutes from "./routes/otpRoutes";
import userRoutes from "./routes/userRoutes";
import http from 'http';
import cors from 'cors';

const app: Application = express();
const port: number = 3000;

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/otp', otpRoutes);
app.use('/api/user', userRoutes)
app.get('/api/ping', (req: Request, res: Response) => {
    res.json({ message: 'pong' });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
