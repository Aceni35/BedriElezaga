import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
  throw new Error("R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY must be set");
}

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});

export const r2Bucket = process.env.R2_BUCKET as string;
export const r2PublicBase = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

export function publicUrlFor(key: string): string {
  if (!r2PublicBase) return "";
  return `${r2PublicBase}/${encodeURI(key)}`;
}

export async function presignUpload(opts: {
  key: string;
  contentType: string;
  contentLength: number;
  expiresIn?: number;
}): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: r2Bucket,
    Key: opts.key,
    ContentType: opts.contentType,
    ContentLength: opts.contentLength,
  });
  return getSignedUrl(r2, command, { expiresIn: opts.expiresIn ?? 300 });
}

export async function deleteObject(key: string): Promise<void> {
  await r2.send(new DeleteObjectCommand({ Bucket: r2Bucket, Key: key }));
}

export async function presignDownload(opts: {
  key: string;
  filename?: string;
  expiresIn?: number;
}): Promise<string> {
  const safeName = (opts.filename ?? "").replace(/["\\\r\n]/g, "");
  const disposition = safeName
    ? `attachment; filename="${safeName}"; filename*=UTF-8''${encodeURIComponent(safeName)}`
    : "attachment";
  const command = new GetObjectCommand({
    Bucket: r2Bucket,
    Key: opts.key,
    ResponseContentDisposition: disposition,
  });
  return getSignedUrl(r2, command, { expiresIn: opts.expiresIn ?? 300 });
}
