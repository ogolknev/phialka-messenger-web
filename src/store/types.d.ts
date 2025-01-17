declare namespace API {
  type Profile = {
    user_id: string,
    name: string,
    description: string,
    tag: string,
    birthdate: string,
    photo: {
      file_id: string,
      download_id: string,
      size: number,
      hash: string,
      mime_type: string,
      upload_at: string
    }
  }
}
