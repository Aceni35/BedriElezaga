import axios from 'axios';
import { apiClient } from '../api/client';
import type { SignUploadInput, SignUploadResponse, UploadedFile } from '../types/uploads';

export const uploadsService = {
  async sign(input: SignUploadInput): Promise<SignUploadResponse> {
    const { data } = await apiClient.post<SignUploadResponse>('/uploads/sign', input);
    return data;
  },

  async putToR2(file: File, signedUrl: string, contentType: string): Promise<void> {
    await axios.put(signedUrl, file, {
      headers: { 'Content-Type': contentType },
    });
  },

  async uploadFile(file: File): Promise<UploadedFile> {
    const sign = await uploadsService.sign({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });
    await uploadsService.putToR2(file, sign.uploadUrl, sign.contentType);
    return { key: sign.key, url: sign.publicUrl, contentType: sign.contentType };
  },

  async remove(key: string): Promise<void> {
    await apiClient.delete('/uploads', { data: { key } });
  },
};
