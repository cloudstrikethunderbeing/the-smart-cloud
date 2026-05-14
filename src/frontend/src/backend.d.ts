import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ThesisRequest {
    email: string;
    comment?: string;
    timestamp: bigint;
    emailStatus: EmailStatus;
}
export enum EmailStatus {
    Queued = "Queued",
    Failed = "Failed",
    Sent = "Sent"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkAdminAccess(): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAccessRequests(): Promise<{
        __kind__: "ok";
        ok: Array<ThesisRequest>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAnalytics(): Promise<{
        __kind__: "ok";
        ok: {
            visitCount: bigint;
            clickCounts: Array<[string, bigint]>;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getCanisterId(): Promise<string>;
    isCallerAdmin(): Promise<boolean>;
    requestThesisAccess(email: string, comment: string | null): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    trackClick(elementId: string): Promise<void>;
    trackVisit(): Promise<void>;
}
