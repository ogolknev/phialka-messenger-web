export class UploadedFile {
  readonly id: string
  readonly url: string
  readonly size: number
  readonly mime: string
  readonly uploadedAt: Date

  constructor(parameters: UploadedFile) {
    this.id = parameters.id
    this.url = parameters.url
    this.size = parameters.size
    this.mime = parameters.mime
    this.uploadedAt = parameters.uploadedAt
  }
}
