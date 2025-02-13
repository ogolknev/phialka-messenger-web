import { HTTPError } from "@/models/errors";

export function useFetch(options: {
  baseURL?: string,
  baseHeaders?: HTTP.Headers
}) {
  const {baseURL, baseHeaders} = options
  return async <T>(
    url: string,
    options: {
      method: HTTP.Method;
      headers?: HTTP.Headers;
      body?: unknown;
    }
  ): Promise<T> => {
    const headers: typeof options.headers = {
      ...baseHeaders,
      ...options.headers,
    };

    let body;
    if (options.body instanceof FormData) {
      delete headers["Content-Type"]
      body = options.body;
    } else if (typeof options.body === 'string') {
      body = options.body
    } else {
      body = JSON.stringify(options.body);
    }

    const response = await fetch(baseURL + url, {
      method: options.method.toUpperCase(),
      headers,
      body
    });

    if (response.ok) {
      return await response.json()
    } else {
      throw new HTTPError(response)
    }
  }
}
