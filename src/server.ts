import express, { Application } from 'express';
import otpRoutes from "./routes/otpRoutes";
import http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';

const app: Application = express();
const port: number = 3000;

const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(cors());
app.use(express.json());

app.use('/api', otpRoutes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
