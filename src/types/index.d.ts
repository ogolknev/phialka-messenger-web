declare namespace HTTP {
  type Headers = {
    accept?: "application/json";
    "Content-Type"?: "application/json";
  }
  type Method = "get" | "post" | "patch" | "put" | "delete"
}
declare namespace API {
  type File = {
    file_id: string,
    download_id: string,
    size: number,
    hash: string,
    mime_type: string,
    upload_at: string
  }
  type Profile = {
    user_id: string,
    name: string,
    description: string,
    tag: string,
    birthdate: string,
    photo: File
  }
  type ProfileEdit = {
    name: string,
    description?: string,
    tag?: string,
    birthdate?: string
  }
  type ServerCreate = {
    title: string,
    description?: string
  }
  type ServerEdit = ServerCreate
  type Server = {
    server_id: string,
    owner_id: string,
    title: string,
    description: string,
    logo?: File,
    created_at: string
  }
}
declare type DateStringFormat = 'dd.mm.yyyy' | 'yyyy.mm.dd' | 'dd-mm-yyyy' | 'yyyy-mm-dd'
