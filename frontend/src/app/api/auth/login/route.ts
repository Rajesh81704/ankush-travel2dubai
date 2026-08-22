import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const targetUrl = `${backendUrl}/auth/login`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    const nextRes = NextResponse.json(data, { status: response.status });

    const setCookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
    if (setCookies && setCookies.length > 0) {
      setCookies.forEach((cookieStr) => {
        nextRes.headers.append('set-cookie', cookieStr);
      });
    } else {
      const rawCookie = response.headers.get('set-cookie');
      if (rawCookie) {
        nextRes.headers.append('set-cookie', rawCookie);
      }
    }

    return nextRes;
  } catch (error) {
    console.error('[API] Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
