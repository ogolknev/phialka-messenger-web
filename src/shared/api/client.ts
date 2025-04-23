import {
  AuthApi,
  ChannelsApi,
  Configuration,
  DomainApi,
  FilesApi,
  MessagesApi,
  PrivateApi,
  ProfileApi,
  ServersApi,
  UsersApi,
} from './openapi-generator-out'

const configuration = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include',
})

export const api = {
  auth: new AuthApi(configuration),
  channels: new ChannelsApi(configuration),
  domain: new DomainApi(configuration),
  files: new FilesApi(configuration),
  message: new MessagesApi(configuration),
  private: new PrivateApi(configuration),
  profile: new ProfileApi(configuration),
  users: new UsersApi(configuration),
  servers: new ServersApi(configuration),
}
