import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // If Supabase env not set (e.g., local without .env or Vercel without env), skip
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.next({ request: { headers: request.headers } });
  }
  try {
    return await createClient(request);
  } catch {
    return NextResponse.next({ request: { headers: request.headers } });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
