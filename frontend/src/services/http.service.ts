
export interface Task {
    _id?: string,
    description: string,
    completed?: boolean,
    completedAt?: string | null,
    createdAt?: string,
}


export class HttpService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    }

    async get<T>(url: string): Promise<T> {
      return this.request<T>(url, 'GET');
    }

    async post<T>(url: string, data: any): Promise<T> {
      return this.request<T>(url, 'POST', data);
    }

    async put<T>(url: string, data: any): Promise<T> {
      return this.request<T>(url, 'PUT', data);
    }

    async delete<T>(url: string): Promise<T> {
      return this.request<T>(url, 'DELETE');
    }
  }