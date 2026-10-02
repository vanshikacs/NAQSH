import { UserRole } from "@/lib/db/types";

export interface AuthUser { id: string; name: string; email: string; role: UserRole; avatar?: string; title?: string; }

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  visitor: { id: "user-visitor-01", name: "Conscious Visitor", email: "visitor@naqsh.craft", role: "visitor", title: "Guest Explorer" },
  buyer: { id: "user-buyer-01", name: "Kabir Siddiqui", email: "kabir@textilecollectors.in", role: "buyer", title: "Heritage Textile Collector" },
  artisan: { id: "AMN-018", name: "Amina Begum", email: "amina@chowkcraft.org", role: "artisan", title: "Master Chikankari Artisan" },
  curator: { id: "user-curator-01", name: "Dr. Sunita Verma", email: "sunita.verma@craftstrust.org", role: "curator", title: "Senior Textile Conservator" },
  admin: { id: "user-admin-01", name: "NAQSH Protocol Admin", email: "admin@naqsh.gov.in", role: "admin", title: "System Administrator" }
};

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case "artisan": return "/artisan/dashboard";
    case "curator": return "/curator/dashboard";
    case "admin": return "/admin/dashboard";
    case "buyer": return "/dashboard";
    default: return "/";
  }
}