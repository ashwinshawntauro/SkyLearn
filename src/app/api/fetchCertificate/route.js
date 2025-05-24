// File: app/api/fetchCertificate/route.js

import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const uid = searchParams.get('uid');
        const course_id = searchParams.get('course_id');
        const candidate_name = searchParams.get('candidate_name');
        const course_name = searchParams.get('course_name');
        const org_name = searchParams.get('org_name');

        if (!uid || !course_id || !candidate_name || !course_name || !org_name) {
            return NextResponse.json({ error: 'All parameters are required' }, { status: 400 });
        }

        const externalApiUrl = `http://34.66.57.20:4000/generate-certificate?uid=${uid}&course_id=${course_id}&candidate_name=${candidate_name}&course_name=${course_name}&org_name=${org_name}`;
        const response = await fetch(externalApiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
