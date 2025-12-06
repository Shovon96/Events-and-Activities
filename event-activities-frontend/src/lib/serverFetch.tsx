import { getCookie } from "@/service/auth.service";


const backendURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {

    const { headers, ...restOptions } = options;
    const accessToken = await getCookie("accessToken")

    const response = await fetch(`${backendURL}${endpoint}`, {
        headers: {
            ...headers,
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
        },
        ...restOptions,
    });

    return response;
}


export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, { method: 'GET', ...options });
    },
    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, { method: 'POST', ...options });
    },
    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, { method: 'PUT', ...options });
    },
    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, { method: 'PATCH', ...options });
    },
    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endpoint, { method: 'DELETE', ...options });
    },
}