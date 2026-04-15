import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action } = body;

  if (action === 'login') {
    return NextResponse.json({ message: 'Login successful' });
  } else if (action === 'signup') {

    return NextResponse.json({ message: 'Signup successful' });
  }

  return NextResponse.json({ error: 'Invalid action' });
}