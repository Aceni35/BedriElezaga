import { useMutation } from '@tanstack/react-query';
import { uploadsService } from '../services/uploads.service';

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => uploadsService.uploadFile(file),
  });
}

export function useRemoveUpload() {
  return useMutation({
    mutationFn: (key: string) => uploadsService.remove(key),
  });
}
