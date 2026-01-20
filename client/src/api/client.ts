import { settings } from "../settings";

class ApiError extends Error {
    constructor(
        public status: number,
        public data: any,
    ) {
        super(data.message || "API request failed");
        this.name = "ApiError";
    }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${settings.serverURL}${endpoint}`;
    const token = localStorage.getItem(settings.localStorageKeys.jwt);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options?.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(response.status, data);
    }

    return data;
}

export const api = {
    user: {
        register: (name: string, password: string) =>
            request<{ token: string }>("/user/register", {
                method: "POST",
                body: JSON.stringify({ name, password }),
            }),

        login: (name: string, password: string) =>
            request<{ token: string }>("/user/login", {
                method: "POST",
                body: JSON.stringify({ name, password }),
            }),
    },

    lobby: {
        list: () => request<any[]>("/lobby"),

        create: (password?: string) =>
            request<any>("/lobby", {
                method: "POST",
                body: JSON.stringify({ password }),
            }),

        get: (id: string, password: string) =>
            request<any>(`/lobby/${id}`, {
                method: "POST",
                body: JSON.stringify({ password }),
            }),

        move: (id: string, move: any, password: string) =>
            request<any>(`/lobby/${id}/move`, {
                method: "POST",
                body: JSON.stringify({ move, password }),
            }),
    },
};

export { ApiError };
