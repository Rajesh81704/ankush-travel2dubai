/* eslint-disable */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
    private client: AxiosInstance;
    private static instance: ApiClient;

    private constructor() {
        // Use Next.js API routes as proxy (points to local server)
        const url = '/api';

        if (process.env.NODE_ENV === 'development') {
            console.log(`[ApiClient] Initializing with proxy API URL: ${url}`);
        }

        this.client = axios.create({
            baseURL: url,
            withCredentials: true,
            timeout: 10000,
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
            },
        });
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    async get<T = any>(url: string, params?: Record<string, any>): Promise<{ data: T; status: number }> {
        try {
            const proxyUrl = url.startsWith('/proxy/') ? url : `/proxy${url}`;
            if (process.env.NODE_ENV === 'development') {
                console.log('[ApiClient] GET request to:', proxyUrl, 'with params:', params);
            }
            const response: AxiosResponse<T> = await this.client.get(proxyUrl, { params });
            if (process.env.NODE_ENV === 'development') {
                console.log('[ApiClient] GET response:', response.status, response.data);
            }
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async post<T = any>(url: string, data: Record<string, any>, isFormData: boolean = false): Promise<{ data: T; status: number }> {
        try {
            const proxyUrl = url.startsWith('/proxy/') || url.startsWith('/auth/') ? url : `/proxy${url}`;
            if (process.env.NODE_ENV === 'development') {
                console.log('[ApiClient] POST request to:', proxyUrl, 'with data:', data);
            }
            const response: AxiosResponse<T> = await this.client.post(proxyUrl, data, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
            });
            if (process.env.NODE_ENV === 'development') {
                console.log('[ApiClient] POST response:', response.status, response.data);
            }
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async put<T = any>(url: string, data: Record<string, any>, isFormData: boolean = false): Promise<{ data: T; status: number }> {
        try {
            const proxyUrl = url.startsWith('/proxy/') ? url : `/proxy${url}`;
            const response: AxiosResponse<T> = await this.client.put(proxyUrl, data, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async delete<T = any>(url: string): Promise<{ data: T; status: number }> {
        try {
            const proxyUrl = url.startsWith('/proxy/') ? url : `/proxy${url}`;
            const response: AxiosResponse<T> = await this.client.delete(proxyUrl);
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async patch<T = any>(url: string, data: Record<string, any>, isFormData: boolean = false): Promise<{ data: T; status: number }> {
        try {
            const proxyUrl = url.startsWith('/proxy/') ? url : `/proxy${url}`;
            const response: AxiosResponse<T> = await this.client.patch(proxyUrl, data, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }
            });
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async checkHealth(): Promise<boolean> {
        try {
            const response = await this.client.get('/health');
            console.log('[ApiClient] Health check passed:', response.data);
            return response.status === 200;
        } catch (error) {
            console.error('[ApiClient] Health check failed - Backend may not be running');
            return false;
        }
    }

    private handleError(error: unknown): void {
        if (error instanceof AxiosError) {
            console.error(`[ApiClient] Request failed:`, {
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: error.config?.url,
                data: error.response?.data,
                message: error.message,
            });
        } else if (error instanceof Error) {
            console.error('[ApiClient] Error:', error.message);
        } else {
            console.error('[ApiClient] Unknown error:', error);
        }
    }
}

const api = ApiClient.getInstance();
export default api;