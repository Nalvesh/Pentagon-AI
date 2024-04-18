import {PrismaClient } from "@prisma/client";

declare global{

    var prisma: PrismaClient | undefined;

};

const primadb= globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !=="production") globalThis.prisma =primadb;

export default primadb;