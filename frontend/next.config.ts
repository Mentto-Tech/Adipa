import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:8000";
const S3_BUCKET = process.env.S3_BUCKET ?? "";
const AWS_REGION = process.env.AWS_REGION ?? "us-east-1";
// S3_BASE_URL pode ser um domínio customizado (ex: CloudFront) ou o padrão da AWS
const s3Hostname = process.env.S3_BASE_URL
  ? new URL(process.env.S3_BASE_URL).hostname
  : S3_BUCKET
    ? `${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com`
    : null;

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "adipa.org.br" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "localhost" },
      // S3 / CDN
      ...(s3Hostname
        ? [{ protocol: "https" as const, hostname: s3Hostname }]
        : [{ protocol: "https" as const, hostname: "**.amazonaws.com" }]),
    ],
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${API_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
