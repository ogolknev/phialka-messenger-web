declare namespace HTTP {
  type Headers = {
    accept?: 'application/json'
    'Content-Type'?: 'application/json'
  }
  type Method = 'get' | 'post' | 'patch' | 'put' | 'delete'
}
declare namespace API {
  type File = {
    fileId: string
    downloadId: string
    size: number
    hash: string
    mimeType: string
    uploadAt: string
  }
  type Profile = {
    userId: string
    name: string
    description?: string | null
    tag: string
    birthdate?: Date | null
    photo?: File
  }
  type ProfileEdit = {
    name: string
    description?: string | null
    tag?: string
    birthdate?: string
  }
  type ServerCreate = {
    title: string
    description?: string
  }
  type ServerEdit = ServerCreate
  type Server = {
    serverId: string
    ownerId: string
    title: string
    description?: string | null
    logo?: File
    createdAt: Date
  }
}
declare type DateStringFormat = 'dd.mm.yyyy' | 'yyyy.mm.dd' | 'dd-mm-yyyy' | 'yyyy-mm-dd'
