import { NextResponse } from "next/server";

export async function POST(request) {
  const authorizationHeader = request.headers.get('authorization');

  if (!authorizationHeader) {
    return NextResponse.json({ error: 'Authorization header is missing' }, { status: 400 });
  }
  const response = NextResponse.json({
    status: 'Cookie registered'
  });
  response.cookies.set('session', authorizationHeader, {
    httpOnly: true,  
    secure: true,    
    path: '/',       
  });

  return response;
}
