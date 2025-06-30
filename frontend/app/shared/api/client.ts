import { useAuth } from "~/modules/auth/hooks/auth";
import {API_URL} from "~/shared/config/api_cfg";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

function normalizeHeaders(input?: HeadersInit): Record<string, string> {
  if (!input) return {};

  if (input instanceof Headers) {
    const result: Record<string, string> = {};
    input.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(input)) {
    return Object.fromEntries(input);
  }

  return input;
}

class Client {

    private static instance: Client | null = null;
    private baseUrl: string = API_URL;

    private constructor(){}

    public static getInstance() {
        if(!Client.instance){
            Client.instance = new Client();
        }

        return Client.instance;
    }

    public get<T=any>(endpoint: string, options?: RequestOptions): Promise<T> {

        return this.request(endpoint, {
            ...options,
            method: 'GET',
        }); 
    }

    public post<T=any, B=any>(endpoint: string, body?: B, options?: RequestOptions): Promise<T> {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
 
    public put<T = any, B = any>(
        endpoint: string,
        body?: B,
        options?: RequestOptions
    ): Promise<T> {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    public delete<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request(endpoint, {
            ...options,
            method: 'DELETE',
        });
    }

    private async request<T=any>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {

        const url = `${this.baseUrl}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...normalizeHeaders(options.headers)
        };

        if (options.auth) {
            
            const {token} =  await useAuth()

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: error.message || 'API Error',
                data: error,
            };
        }

        return response.json();

    }
}

export default Client.getInstance();