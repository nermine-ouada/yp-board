import { getSessionExpiry } from "@/lib/auth";
import { SessionTimer } from "@/components/admin/SessionTimer";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const expiresAt = await getSessionExpiry();

  return (
    <>
      {expiresAt !== null && <SessionTimer expiresAt={expiresAt} />}
      {children}
    </>
  );
}
