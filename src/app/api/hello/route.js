import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(request)  {
    const {name}= await request.json();
    try {
        console.log(name)
        return NextResponse.json(name)
    } catch (error) {
        console.log(error)
        return NextResponse.error('Internal error: ',500)
    }
}