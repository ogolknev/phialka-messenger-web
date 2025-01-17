export class HTTPError extends Error {
  response: Response

  constructor (response: Response) {
    super(`HTTP Error: ${response.statusText}`)
    this.response = response
  }
}
