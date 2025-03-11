"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
exports.db = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        transactionOptions: {
            maxWait: 25000, /// default 2000
            timeout: 25000, /// default 5000
        },
        log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.db;
}
