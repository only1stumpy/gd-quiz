import {LevelData} from "@/types/level";

// Cache for CSRF token with expiry
let csrfToken: string | null = null;
let csrfTokenExpiry: number | null = null;

/**
 * Fetch CSRF token from server
 */
async function getCsrfToken(): Promise<string> {
    const now = Date.now();

    // Return cached token if still valid (23 hours for safety margin)
    if (csrfToken && csrfTokenExpiry && now < csrfTokenExpiry) {
        return csrfToken;
    }

    try {
        const res = await fetch("/api/csrf");
        if (!res.ok) {
            throw new Error("Failed to fetch CSRF token");
        }

        const data = await res.json();
        if (!data.success || !data.token) {
            throw new Error("Invalid CSRF token response");
        }

        csrfToken = data.token;
        csrfTokenExpiry = now + (23 * 60 * 60 * 1000); // 23 hours

        if (!csrfToken) {
            throw new Error("CSRF token is null");
        }

        return csrfToken;
    } catch (error) {
        console.error("CSRF token fetch error:", error);
        throw error;
    }
}

export const API = {
    //  Запрос на получение всех уровней
     getAllLevels: async(signal: AbortSignal): Promise<LevelData[]> => {
        try {
            const res = await fetch("/api/levels", { signal });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            if (!json.success || !Array.isArray(json.data)) {
                throw new Error("Invalid response format");
            }

            return json.data;
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                throw err;
            }
            throw new Error(err instanceof Error ? err.message : 'Failed to load levels');
        }
     },
    // Запрос на создание сида с заданными параметрами
    seed: async (seed: string, mode: string, levels: LevelData[]): Promise<Response> => {
        try {
            // Get CSRF token before making POST request
            const token = await getCsrfToken();

            const res = await fetch("/api/seed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": token,
                },
                body: JSON.stringify({
                    seed,
                    mode,
                    levels,
                }),
            });

            if (!res.ok) {
                // If CSRF token is invalid, clear cache and retry once
                if (res.status === 403) {
                    csrfToken = null;
                    const retryToken = await getCsrfToken();

                    const retryRes = await fetch("/api/seed", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-csrf-token": retryToken,
                        },
                        body: JSON.stringify({
                            seed,
                            mode,
                            levels,
                        }),
                    });

                    if (!retryRes.ok) {
                        if (retryRes.status === 403) {
                            throw new Error("Security validation failed. Please refresh the page and try again.");
                        }
                        throw new Error(`Failed to save quiz: ${retryRes.status}`);
                    }

                    return retryRes;
                }

                throw new Error(`Failed to save quiz: ${res.status}`);
            }

            return res;
        } catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Failed to save quiz');
        }
    },
    // Запрос на получение сида по seed и mode
    getSeed: async (seed: string, mode: string, signal: AbortSignal) => {
        try {
            const res = await fetch(`/api/seed/get?seed=${seed}&mode=${mode}`, { signal });

            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('Quiz not found');
                }
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            if (!json.levels || !Array.isArray(json.levels)) {
                throw new Error("Invalid quiz data");
            }

            return json;
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                throw err;
            }
            throw new Error(err instanceof Error ? err.message : 'Failed to load quiz');
        }
    }

}