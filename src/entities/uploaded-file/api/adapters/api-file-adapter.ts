import type { ApiFile } from '@/shared'
import { UploadedFile } from '../../model'

export function adaptApiFile(apiFile: ApiFile): UploadedFile {
  return new UploadedFile(
    '/api/files/download/' + apiFile.download_id,
    apiFile.size,
    apiFile.mime_type,
    new Date(apiFile.upload_at),
  )
}
