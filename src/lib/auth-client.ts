import { createAuthClient } from "better-auth/react";
import { ENV } from "../config/env.config";

export const authClient = createAuthClient({
    baseURL: ENV.API_BASE_URL,
});
