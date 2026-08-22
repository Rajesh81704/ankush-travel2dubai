import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Redirect to backend Google auth endpoint using HTTP
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    return NextResponse.redirect(`${backendUrl}/auth/google`);
  } catch (error) {
    console.error('[API] Google auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
