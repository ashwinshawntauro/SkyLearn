import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST(req) {
    const {tutorId,tutorName,CourseName,CourseDesc,course_price,Diff,courseDuration,enrollment_deadline,youtube_link}= await req.json()
    try {
        const newCourse = await prisma.cOURSE.create({
            data: {
                course_name:CourseName,
                course_description:CourseDesc,
                course_price: parseFloat(course_price),
                difficulty:Diff,
                course_duration:courseDuration,
                enrollment_deadline: new Date(enrollment_deadline),
                youtube_link:youtube_link,
            },
        });
        const createTeaching = await prisma.tEACHING.create({
            data: {
                course_id: newCourse.course_id, 
                tutor_id: tutorId,
                tutor_name:tutorName,
            },
        });
        if (newCourse && createTeaching){
            return NextResponse.json(newCourse,{status:200})
        }
        else{
            return NextResponse.error({ error: 'All fields are required' },
                { status: 400 })
        }
    } catch (error) {
        console.error('Error creating course:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}