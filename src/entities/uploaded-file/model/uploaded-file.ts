export class UploadedFile {
  constructor(
    readonly url: string,
    readonly size: number,
    readonly mime: string,
    readonly uploaded: Date,
  ) {}
}
