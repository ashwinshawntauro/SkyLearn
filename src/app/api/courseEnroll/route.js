import { NextResponse} from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(req)  {
    const {student_id,course_id} = await req.json()
    try{
        const enrollCourse = await prisma.eNROLLMENT.create({
            data:{
                student_id:student_id,
                course_id:course_id,
            }
        })
        return NextResponse.json({enrollCourse},{status:200})
    }
    catch(error){
        return NextResponse.error(error,500)
    }
}