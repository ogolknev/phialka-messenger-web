export class HTTPError extends Error {
  constructor(response: Response) {
    super(`Request failed: ${response.statusText}`)
    this.status = response.status
  }

  status: number
}
