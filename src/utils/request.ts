export class Request {
  static base = 'http://localhost:9090'

  static options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  static get<T>(url: string): Promise<T> {
    return fetch(this.base + url, {
      ...this.options,
      method: 'get',
    }).then((res) => res.json())
  }

  static post(url: string, data: any) {
    return fetch(this.base + url, {
      ...this.options,
      method: 'post',
    }).then((res) => res.json())
  }
}
