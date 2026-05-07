export interface SignUploadInput {
  filename: string;
  contentType: string;
  size: number;
}

export interface SignUploadResponse {
  key: string;
  uploadUrl: string;
  publicUrl: string;
  contentType: string;
  expiresIn: number;
}

export interface UploadedFile {
  key: string;
  url: string;
  contentType: string;
}
