import type { ApiFile } from '@/shared'
import { UploadedFile } from '../../model'

export function adaptApiFile(apiFile: ApiFile): UploadedFile {
  return new UploadedFile({
    id: apiFile.file_id,
    url: '/api/files/download/' + apiFile.download_id,
    size: apiFile.size,
    mime: apiFile.mime_type,
    uploadedAt: new Date(apiFile.upload_at),
  })
}
