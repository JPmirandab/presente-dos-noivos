import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { MenuLateral } from "./_components/menu-lateral";
import { BarraInferior } from "./_components/barra-inferior";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await auth();
  if (!sessao) redirect("/login");

  return (
    <div className="min-h-screen md:flex">
      <MenuLateral />
      <main className="flex-1 p-4 pb-24 md:p-8">{children}</main>
      <BarraInferior />
    </div>
  );
}