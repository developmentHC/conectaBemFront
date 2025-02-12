// import { jwtDecode } from "jwt-decode";
// import { NextRequest, NextResponse } from "next/server";
// import { IJwt } from "./types/auth";

// params(request: NextRequest)

export const middleware = () => {
  // const token = request.cookies.get('authToken')?.value;
  // const targetPath = request.nextUrl.pathname;

  // if (!token) {
  //   // if (targetPath !== '/auth') {
  //   //   return NextResponse.redirect(new URL('/auth', request.url));
  //   // }

  //   return;
  // }

  // const session: IJwt = jwtDecode(token);

  // if (!session || session.exp < Date.now() / 1000) {
  //   request.cookies.delete("authToken");

  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  // if (!session.email?.isConfirmed) {
  //   if (targetPath !== "/auth/confirm-email") {
  //     return NextResponse.redirect(new URL("/auth/confirm-email", request.url));
  //   }

  //   return;
  // }

  // if (!session.role) {
  //   if (targetPath !== '/auth/register') {
  //     return NextResponse.redirect(new URL('/auth/register', request.url));
  //   }

  //   return;
  // }
};

export const config = {
  matcher: "/((?!api|static|...|_next).*)",
};
