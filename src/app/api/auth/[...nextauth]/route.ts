import { NextRequest } from "next/server";

import { handlers } from "@/auth";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// https://github.com/nextauthjs/next-auth/discussions/12160
function rewriteRequest(request: NextRequest) {
  let { protocol, host, pathname } = request.nextUrl;

  const headers = request.headers;
  // Host rewrite adopted from next-auth/packages/core/src/lib/utils/env.ts:createActionURL
  const detectedHost = headers.get("x-forwarded-host") ?? host;
  const detectedProtocol = headers.get("x-forwarded-proto") ?? protocol;

  console.log(
    detectedHost,
    detectedProtocol,
    protocol,
    basePath,
    pathname,
    request.nextUrl.search,
  );

  const _protocol = detectedProtocol.match(/^https?/) ? "https:" : "http:";

  console.log(
    `${_protocol}//${detectedHost}${basePath}${pathname}${request.nextUrl.search}`,
  );

  const url = new URL(
    `${_protocol}//${detectedHost}${basePath}${pathname}${request.nextUrl.search}`,
  );

  return new NextRequest(url, request);
}

export async function GET(request: NextRequest) {
  return await handlers.GET(rewriteRequest(request));
}

export async function POST(request: NextRequest) {
  return await handlers.POST(rewriteRequest(request));
}
