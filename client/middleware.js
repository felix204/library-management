import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/register';
    const token = request.cookies.get('token')?.value || '';

    // Ana sayfaya gelirse ve token yoksa login'e yönlendir
    if (path === '/' && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Token yoksa ve public path'te değilse login'e yönlendir
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Token varsa ve public path'teyse (login/register) ana sayfaya yönlendir
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/', '/login', '/register']
}; 