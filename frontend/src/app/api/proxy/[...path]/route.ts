import { NextRequest, NextResponse } from 'next/server';

/**
 * Generic proxy route for forwarding requests to the backend
 * Handles GET, POST, PUT, DELETE, PATCH methods
 * Usage: /api/proxy/[endpoint] → proxies to BACKEND_URL/[endpoint]
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createProxiedResponse(data: any, status: number, backendRes: Response): NextResponse {
  const nextRes = NextResponse.json(data, { status });
  const setCookies = backendRes.headers.getSetCookie ? backendRes.headers.getSetCookie() : [];
  if (setCookies && setCookies.length > 0) {
    setCookies.forEach((cookieStr) => {
      nextRes.headers.append('set-cookie', cookieStr);
    });
  } else {
    const rawCookie = backendRes.headers.get('set-cookie');
    if (rawCookie) {
      nextRes.headers.append('set-cookie', rawCookie);
    }
  }
  return nextRes;
}

function getBackendUrl(): string {
  return process.env.BACKEND_URL || 'http://127.0.0.1:9000';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const backendUrl = getBackendUrl();
    const targetUrl = `${backendUrl}/${path}${searchParams ? `?${searchParams}` : ''}`;

    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('image/') || contentType.includes('application/octet-stream')) {
      const arrayBuffer = await response.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': response.headers.get('cache-control') || 'public, max-age=31536000, immutable',
        },
      });
    }

    const data = await response.json();
    return createProxiedResponse(data, response.status, response);
  } catch (error) {
    console.error('[PROXY] GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Proxy error', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    const body = await request.json();
    const backendUrl = getBackendUrl();
    const targetUrl = `${backendUrl}/${path}`;

    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    return createProxiedResponse(data, response.status, response);
  } catch (error) {
    console.error('[PROXY] POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Proxy error', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    const body = await request.json();
    const backendUrl = getBackendUrl();
    const targetUrl = `${backendUrl}/${path}`;

    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    return createProxiedResponse(data, response.status, response);
  } catch (error) {
    console.error('[PROXY] PUT error:', error);
    return NextResponse.json(
      { success: false, message: 'Proxy error', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    const backendUrl = getBackendUrl();
    const targetUrl = `${backendUrl}/${path}`;

    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      credentials: 'include',
    });

    const data = await response.json();
    return createProxiedResponse(data, response.status, response);
  } catch (error) {
    console.error('[PROXY] DELETE error:', error);
    return NextResponse.json(
      { success: false, message: 'Proxy error', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = (await params).path.join('/');
    const body = await request.json();
    const backendUrl = getBackendUrl();
    const targetUrl = `${backendUrl}/${path}`;

    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    const data = await response.json();
    return createProxiedResponse(data, response.status, response);
  } catch (error) {
    console.error('[PROXY] PATCH error:', error);
    return NextResponse.json(
      { success: false, message: 'Proxy error', error: String(error) },
      { status: 500 }
    );
  }
}
