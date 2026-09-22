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
    /**
     * / Check whether the calling principal is an admin.
     * / Returns #ok(true) if authorized, #err("NotAuthorized") otherwise.
     */
    checkAdminAccess(): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Return all access requests — admin use only.
     * / Non-admin callers receive a #NotAuthorized error.
     */
    getAccessRequests(): Promise<{
        __kind__: "ok";
        ok: Array<ThesisRequest>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Return visit and click analytics — admin only.
     */
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
    /**
     * / Return the canister's own principal ID as text. No auth required.
     */
    getCanisterId(): Promise<string>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Submit a thesis access request and trigger the 3-email drip sequence.
     * / Returns #ok("Request received") on success or #err(reason) on validation failure.
     */
    requestThesisAccess(email: string, comment: string | null): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    /**
     * / Increment the click counter for a given element ID. No auth required.
     */
    trackClick(elementId: string): Promise<void>;
    /**
     * / Increment the global visit counter. No auth required.
     */
    trackVisit(): Promise<void>;
}
