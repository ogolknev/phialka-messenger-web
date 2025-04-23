export function normalizeFile(apiFile: {
  download_id: string
  file_id: string
  hash: string
  mime_type: string
  size: number
  upload_at: string
}): API.File {
  return {
    downloadId: apiFile.download_id,
    fileId: apiFile.file_id,
    hash: apiFile.hash,
    mimeType: apiFile.mime_type,
    size: apiFile.size,
    uploadAt: apiFile.upload_at,
  }
}
