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

        // Check if all required parameters are present
        if (!uid || !course_id || !candidate_name || !course_name || !org_name) {
            return NextResponse.json({ error: 'All parameters are required' }, { status: 400 });
        }

        // Construct the external API URL for certificate generation
        const externalApiUrl = `http://35.208.76.68:4000/generate-certificate?uid=${uid}&course_id=${course_id}&candidate_name=${candidate_name}&course_name=${course_name}&org_name=${org_name}`;

        // Fetch the certificate data from the external API
        const response = await fetch(externalApiUrl);

        // Check if the external API responded with a successful status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the data from the external API
        const data = await response.json();

        // Return the certificate data as the API response
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
