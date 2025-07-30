import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bỏ qua các file tĩnh và API route
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Kiểm tra nếu path chưa có locale (vi, en, ko, ja, zh)
  const segments = pathname.split('/').filter(Boolean);
  const supportedLocales = ['vi', 'en', 'ko', 'ja', 'zh'];

  if (!segments[0] || !supportedLocales.includes(segments[0])) {
    const url = req.nextUrl.clone();
    url.pathname = `/vi${pathname}`;
    return NextResponse.redirect(url);
  }
}
