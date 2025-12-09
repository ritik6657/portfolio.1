import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    // Check if Supabase environment variables are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase environment variables not configured. Skipping auth middleware.")
        // If accessing admin routes without auth configured, redirect to home
        if (request.nextUrl.pathname.startsWith("/admin")) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = "/"
            return NextResponse.redirect(redirectUrl)
        }
        return NextResponse.next()
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Refresh session if expired - wrap in try-catch to handle API failures
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Protect admin routes
        if (request.nextUrl.pathname.startsWith("/admin")) {
            if (!user) {
                // Redirect to login page
                const redirectUrl = request.nextUrl.clone()
                redirectUrl.pathname = "/auth/login"
                redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)
                return NextResponse.redirect(redirectUrl)
            }
        }

        return response
    } catch (error) {
        console.error("Middleware error while checking auth:", error)
        // On error, allow the request to proceed but redirect admin routes to home
        if (request.nextUrl.pathname.startsWith("/admin")) {
            const redirectUrl = request.nextUrl.clone()
            redirectUrl.pathname = "/"
            return NextResponse.redirect(redirectUrl)
        }
        return response
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
