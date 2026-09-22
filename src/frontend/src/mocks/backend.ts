import { UserRole } from "../backend";
import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  assignCallerUserRole: async () => undefined,
  checkAdminAccess: async () => ({ __kind__: "ok", ok: false }),
  getAccessRequests: async () => ({ __kind__: "ok", ok: [] }),
  getAnalytics: async () => ({
    __kind__: "ok",
    ok: { visitCount: BigInt(0), clickCounts: [] },
  }),
  getCallerUserRole: async (): Promise<UserRole> => UserRole.guest,
  getCanisterId: async () => "mock-canister-id",
  isCallerAdmin: async () => false,
  requestThesisAccess: async () => ({ __kind__: "ok", ok: "Request received" }),
  trackClick: async () => undefined,
  trackVisit: async () => undefined,
};
